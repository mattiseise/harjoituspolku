'use strict';
// Author one definition; reuse the shared renderer, style, feedback and rewards.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const G=require('../assets/grading.js');
const ROOT=path.resolve(__dirname,'..');
const TYPES=new Set(['text','choice','match','order','select','gap','translate','wordhunt']);
const slug=s=>typeof s==='string'&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
const nonempty=s=>typeof s==='string'&&s.trim().length>0;
const strings=a=>Array.isArray(a)&&a.length>0&&a.every(nonempty);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function validate(input){
 const d=JSON.parse(JSON.stringify(input));
 const need=(ok,message)=>{if(!ok)throw new Error(message);};
 need(slug(d.id)&&slug(d.slug)&&slug(d.subjectSlug),'id, slug ja subjectSlug: käytä pieniä a–z-kirjaimia, numeroita ja väliviivoja.');
 need(Number.isInteger(d.grade)&&d.grade>=1&&d.grade<=9,'grade: vuosiluokka on 1–9.');
 for(const key of ['title','subject','description','sourceNote'])need(nonempty(d[key]),key+' puuttuu.');
 need(['neon','pastel','galaxy'].includes(d.theme),'theme: neon, pastel tai galaxy.');
 d.status=d.status||'draft';need(['draft','ready'].includes(d.status),'status: draft tai ready.');
 need(nonempty(d.language)&&/^[a-z]{2,3}(?:-[a-zA-Z0-9]{2,8})*$/.test(d.language),'language: anna kielitunniste, esimerkiksi fi, en tai es.');
 need(Array.isArray(d.tags)&&d.tags.every(nonempty),'tags: anna hakusanojen taulukko.');
 need(nonempty(d.minutes),'minutes puuttuu.');
 need(Array.isArray(d.sections)&&d.sections.length>0,'sections puuttuu.');
 d.sections.forEach(s=>need(nonempty(s.title)&&nonempty(s.intro),'Jokainen osio tarvitsee title- ja intro-tekstit.'));
 need(Array.isArray(d.questions)&&d.questions.length>0,'questions puuttuu.');
 const ids=new Set();
 d.questions.forEach(q=>{
  const label=q.id||'(id puuttuu)';
  need(slug(q.id)&&!ids.has(q.id),label+': kysymystunniste on puuttuva, virheellinen tai päällekkäinen.');ids.add(q.id);
  need(Number.isInteger(q.section)&&q.section>=0&&q.section<d.sections.length,label+': virheellinen section.');
  need(nonempty(q.prompt)&&nonempty(q.explanation)&&strings(q.answers),label+': prompt, explanation tai answers puuttuu.');
  need(nonempty(q.skill)&&nonempty(d.skills?.[q.skill]?.title)&&nonempty(d.skills?.[q.skill]?.reviewTip),label+': lisää taitokohtainen title ja reviewTip.');
  q.language=q.language||d.language;
  const type=q.type||(q.options?'choice':'text');need(TYPES.has(type),label+': tuntematon tehtävätyyppi '+type);
  if(['choice','select'].includes(type)){
   need(strings(q.options)&&new Set(q.options).size===q.options.length,label+': vaihtoehtojen tulee olla yksilöllisiä.');
   need(q.answers.every(a=>q.options.includes(a)),label+': vastausavainta ei löydy vaihtoehdoista.');
   if(type==='select')need(nonempty(q.sentence),label+': sananvalinnan sentence puuttuu.');
  }
  if(['text','translate'].includes(type))need(q.options===undefined||q.options===null,label+': tekstitehtävällä ei ole valmiita vaihtoehtoja.');
  if(type==='translate')need(nonempty(q.source)&&nonempty(q.sourceLanguage)&&q.sourceLanguage!==q.language,label+': määritä lähtövirke ja eri lähtö-/vastauskielet.');
  if(type==='match'){
   need(Array.isArray(q.pairs)&&q.pairs.length>=2&&q.pairs.every(p=>nonempty(p.left)&&nonempty(p.right)),label+': yhdistämisparit puuttuvat.');
   const right=q.pairs.map(p=>p.right);need(new Set(right).size===right.length,label+': sama vastaus on kahdessa parissa.');
   if(q.choices)need(strings(q.choices)&&new Set(q.choices).size===q.choices.length&&right.every(x=>q.choices.includes(x)),label+': choices ei kata kaikkia pareja yksilöllisesti.');
   need(q.answers[0]===G.solution(q),label+': yhdistämisen mallivastaus ei vastaa pareja.');
  }
  if(type==='order'){
   need(strings(q.tokens),label+': sanapalikat puuttuvat.');
   for(const expected of q.answers){const pool=q.tokens.slice(),ordered=[];
    for(const word of expected.split(/\s+/)){const at=pool.findIndex(t=>G.normalize(t)===G.normalize(word));need(at>=0,label+': mallivastausta ei saa annetuista palikoista.');ordered.push(pool.splice(at,1)[0]);}
    need(!pool.length&&G.check(q,ordered),label+': palikoiden määrä tai välimerkit eivät vastaa mallivastausta.');
   }
  }
  if(type==='gap'){
   need(nonempty(q.sentence)&&Array.isArray(q.gaps)&&q.gaps.length>0&&q.gaps.every(g=>strings(g.answers)&&nonempty(g.clue)),label+': aukon vastaukset/vihjeet puuttuvat.');
   need(q.sentence.split('___').length-1===q.gaps.length,label+': ___-aukkojen määrä ei vastaa gaps-taulukkoa.');
   need(q.answers[0]===G.solution(q),label+': aukon kokonainen mallivastaus on virheellinen.');
  }
  if(type==='wordhunt'){
   need(nonempty(q.strip)&&Array.from(q.strip).length%5===0&&q.strip===q.strip.normalize('NFC').toLocaleUpperCase('es'),label+': sanakäärmeen jono kirjoitetaan NFC-muodossa isoilla kirjaimilla, pituus jaollinen viidellä.');
   need(strings(q.words)&&new Set(q.words.map(G.normalize)).size===q.words.length&&strings(q.clues)&&q.clues.length===q.words.length,label+': sanojen ja vihjeiden tulee vastata toisiaan yksilöllisesti.');
   q.words.forEach(w=>{const word=w.toLocaleUpperCase('es');need(q.strip.includes(word)&&q.strip.indexOf(word)===q.strip.lastIndexOf(word),label+': sana puuttuu käärmeestä tai esiintyy siinä useasti: '+w);});
   need(q.answers[0]===G.solution(q),label+': sanakäärmeen mallivastaus ei vastaa sanoja.');
  }
 });
 d.sections.forEach((s,i)=>need(d.questions.some(q=>q.section===i),'Tyhjä osio: '+s.title));
 return d;
}
function render(d){
 const values={TITLE:d.title,SUBJECT:d.subject,GRADE:d.grade,DESCRIPTION:d.description,THEME:d.theme,SLUG:d.slug,COUNT:d.questions.length,SOURCE_NOTE:d.sourceNote,WRITING_NOTE:d.writingNote||'Oikea kirjoitusasu ja olennaiset aksentit tarvitaan.',SUBJECT_HREF:'../../../index.html?luokka='+d.grade+'&aine='+encodeURIComponent(d.subject)+'#kokeet'};
 const markup={DRAFT_NOTICE:d.status==='draft'?'<p class="alert" role="status">Luonnos. Vaihda mallitehtävät oman koealueen tehtäviin, tarkista sisältö ja aseta status ready ennen harjoituksen avaamista.</p>':'',DRAFT_HIDDEN:d.status==='draft'?' hidden':'',QUIZ_SCRIPT:d.status==='draft'?'':'<script src="../../../assets/quiz.js"></script>'};
 return fs.readFileSync(path.join(ROOT,'templates/koe.html.tpl'),'utf8').replace(/\{\{([A-Z_]+)\}\}/g,(_,key)=>{if(Object.hasOwn(markup,key))return markup[key];if(!Object.hasOwn(values,key))throw Error('Tuntematon pohjamerkintä: '+key);return escape(values[key]);});
}
function createExam(input,{repoRoot=ROOT,register=false,replace=false}={}){
 const d=validate(input),root=path.resolve(repoRoot),href=`sisalto/${d.grade}/${d.subjectSlug}/${d.slug}.html`;
 const html=path.resolve(root,href),js=html.replace(/\.html$/,'.js');
 if(!html.startsWith(root+path.sep))throw Error('Kohde ei ole repositorion sisällä.');
 for(const file of [html,js])if(fs.existsSync(file)&&!replace)throw Error('Tiedosto on jo olemassa; käytä --replace vasta tarkistettuasi kohteen: '+file);
 const catalogFile=path.join(root,'sisalto/kokeet.js');let catalog;
 if(register){
  if(d.status!=='ready')throw Error('Luonnosta ei voi lisätä kirjastoon.');
  const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(catalogFile,'utf8'),sandbox,{timeout:1000});catalog=JSON.parse(JSON.stringify(sandbox.window.EXAMS));
  if(!Array.isArray(catalog))throw Error('Kirjaston EXAMS-taulukko puuttuu.');
  const existing=catalog.find(e=>e.id===d.id),samePath=catalog.find(e=>e.href.split('?')[0]===href);
  if(existing&&existing.href!==href||samePath&&samePath.id!==d.id)throw Error('Kokeen id tai polku kuuluu jo toiselle kokeelle.');
  if(existing&&!replace)throw Error('Koe on jo kirjastossa; päivitä se --replace-valinnalla.');
  const entry={id:d.id,grade:d.grade,subject:d.subject,title:d.title,description:d.description,count:d.questions.length,minutes:d.minutes,href,tags:d.tags,theme:d.theme};
  if(existing)catalog[catalog.indexOf(existing)]=entry;else catalog.push(entry);
 }
 const htmlText=render(d),jsText='window.QUIZ = '+JSON.stringify(d,null,2)+';\n';
 fs.mkdirSync(path.dirname(html),{recursive:true});fs.writeFileSync(html,htmlText);fs.writeFileSync(js,jsText);
 if(catalog)fs.writeFileSync(catalogFile,'window.EXAMS = '+JSON.stringify(catalog,null,2)+';\n');
 return {html,js,href,count:d.questions.length,status:d.status,registered:register};
}
if(require.main===module){try{
 const args=process.argv.slice(2),allowed=new Set(['--input','--register','--replace']);let input,register=false,replace=false;
 for(let i=0;i<args.length;i++){if(!allowed.has(args[i]))throw Error('Tuntematon valinta: '+args[i]);if(args[i]==='--input'){input=args[++i];if(!input||input.startsWith('--'))throw Error('--input tarvitsee JSON-tiedoston.');}else if(args[i]==='--register')register=true;else replace=true;}
 if(!input)throw Error('Käyttö: node tools/create-exam.cjs --input koe.json [--register] [--replace]');
 const result=createExam(JSON.parse(fs.readFileSync(path.resolve(input),'utf8')),{register,replace});console.log(JSON.stringify(result,null,2));
}catch(error){console.error(error.message);process.exitCode=1;}}
module.exports={validate,render,createExam};
