'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),vm=require('node:vm');
const {validate,render,createExam}=require('./create-exam.cjs'),G=require('../assets/grading.js');
const sample=require('../templates/koe.json');
const copy=()=>JSON.parse(JSON.stringify(sample));
let checks=0;function test(name,fn){try{fn();checks++;}catch(e){e.message=name+': '+e.message;throw e;}}
function bad(change){const d=copy();change(d);assert.throws(()=>validate(d));}
test('All eight types and correct sample answers',()=>{
 const d=validate(sample);assert.equal(d.questions.length,8);
 const answers=['cat','dog',['cat','dog','sun'],['I','have','a','dog'],'has',['have','cat'],'Minulla on koira',['cat','dog','sun']];
 d.questions.forEach((q,i)=>assert.equal(G.check(q,answers[i]),true,q.id));
 assert.equal(G.check(d.questions[6],'Minulla on kissa'),false);
 for(const [i,a] of [[2,['cat','','sun']],[3,['I','have']],[5,['have','']],[7,['cat']]])assert.equal(G.answered(d.questions[i],a),false);
 assert.equal(G.check(d.questions[2],['dog','cat','sun']),false);
 assert.equal(G.check(d.questions[5],['has','cat']),false);
 assert.notEqual(G.normalize('sí'),G.normalize('si'));
});
test('Malformed definitions rejected',()=>{
 bad(d=>d.slug='../escape');bad(d=>d.grade=10);bad(d=>d.theme='other');
 bad(d=>d.questions[0].skill='missing');bad(d=>d.questions[1].id=d.questions[0].id);
 bad(d=>d.questions[1].type='invented');bad(d=>d.questions[0].answers=['fish']);
 bad(d=>d.questions[2].pairs[1].right='cat');bad(d=>d.questions[3].tokens.pop());
 bad(d=>d.questions[4].sentence='');bad(d=>d.questions[5].sentence='One ___');
 bad(d=>d.questions[6].sourceLanguage='fi');bad(d=>d.questions[7].strip='X'.repeat(15));
 bad(d=>d.questions[7].strip='CATCATDOGSUNXXX');bad(d=>d.sections.push({title:'Empty',intro:'Empty'}));
});
test('Escaped metadata, draft and module order',()=>{
 const d=validate(sample);d.title='<img src=x onerror=alert(1)>';let html=render(d);
 assert.ok(html.includes('&lt;img'));assert.ok(!html.includes('<img src=x'));
 assert.ok(html.includes('Luonnos.'));assert.ok(!html.includes('src="../../../assets/quiz.js"'));
 assert.match(html, /id="quiz-workspace"[^>]*hidden/);
 d.status='ready';d.grade=6;html=render(d);
 assert.ok(html.includes('../../../sisalto/5/suomen-kieli/kpop/index.html?palkinnot=1'));
 assert.ok(html.includes('src="../../../assets/quiz.js"'));
 const modules=['grading','review','rewards','wordhunt','interactions','rhythm','quiz'];
 const indexes=modules.map(x=>html.indexOf('/'+x+'.js'));assert.ok(indexes.every((x,i)=>x>=0&&(!i||x>indexes[i-1])));
 assert.ok(!/\{\{[A-Z_]+\}\}/.test(html));
});
const scratch=fs.mkdtempSync(path.join(os.tmpdir(),'harjoituspolku-template-'));
try{
 fs.mkdirSync(path.join(scratch,'sisalto'));const catalog=path.join(scratch,'sisalto/kokeet.js');fs.writeFileSync(catalog,'window.EXAMS = [];\n');
 const opts={repoRoot:scratch};const catalogData=()=>{const s={window:{}};vm.runInNewContext(fs.readFileSync(catalog,'utf8'),s);return s.window.EXAMS;};
 test('Draft registration leaves no files',()=>{assert.throws(()=>createExam(sample,{...opts,register:true}));assert.ok(!fs.existsSync(path.join(scratch,'sisalto/5/englanti/uusi-koe.html')));});
 test('Draft generation and overwrite protection',()=>{const r=createExam(sample,opts);assert.ok(fs.existsSync(r.html));assert.equal(catalogData().length,0);assert.throws(()=>createExam(sample,opts));});
 test('Ready exam in another grade and registration',()=>{const d=copy();d.grade=6;d.status='ready';const r=createExam(d,{...opts,register:true});assert.equal(r.count,8);const c=catalogData();assert.equal(c.length,1);assert.equal(c[0].href,'sisalto/6/englanti/uusi-koe.html');assert.equal(c[0].count,8);assert.equal(c[0].theme,'pastel');const s={window:{}};vm.runInNewContext(fs.readFileSync(r.js,'utf8'),s);assert.equal(s.window.QUIZ.questions.length,8);});
 test('Replace updates registered metadata',()=>{const d=copy();d.grade=6;d.status='ready';d.title='Uusi otsikko';createExam(d,{...opts,register:true,replace:true});assert.equal(catalogData()[0].title,d.title);});
 test('ID and path collisions rejected before writes',()=>{const d=copy();d.grade=6;d.status='ready';d.slug='other';assert.throws(()=>createExam(d,{...opts,register:true}));assert.ok(!fs.existsSync(path.join(scratch,'sisalto/6/englanti/other.html')));d.slug='uusi-koe';d.id='another-id';assert.throws(()=>createExam(d,{...opts,register:true,replace:true}));assert.equal(catalogData()[0].id,sample.id);});
}finally{
 const resolved=path.resolve(scratch),parent=path.resolve(os.tmpdir());
 if(path.dirname(resolved)!==parent||!path.basename(resolved).startsWith('harjoituspolku-template-'))throw Error('Unsafe scratch cleanup path');
 fs.rmSync(resolved,{recursive:true,force:true});
}
console.log('Koepohja ja luontityökalu: '+checks+' tarkistuskokonaisuutta OK.');
