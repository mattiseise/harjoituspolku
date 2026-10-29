'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const G=require('../assets/grading.js'),Review=require('../assets/review.js');
const slugs=['jaatelobaari','saaseikkailu','kpop-finaali'];let total=0;
const load=slug=>{const s={window:{}};vm.runInNewContext(fs.readFileSync(`sisalto/5/espanja/${slug}.js`,'utf8'),s);return JSON.parse(JSON.stringify(s.window.QUIZ));};
// Build an actual permutation of the supplied tokens, retaining punctuation and
// duplicate word identities, rather than bypassing the interaction with a string.
function ordered(q,text){const pool=q.tokens.slice();return text.split(' ').map(word=>{const i=pool.findIndex(t=>G.normalize(t)===G.normalize(word));assert(i>=0,`${q.id}: missing token ${word}`);return pool.splice(i,1)[0];});}
for(const slug of slugs){const quiz=load(slug);assert.equal(quiz.questions.length,slug==='kpop-finaali'?23:20);
 assert.equal(quiz.questions.filter(q=>q.type==='gap').length,2);assert.equal(quiz.questions.filter(q=>q.type==='translate').length,2);
 const rows=[];
 for(const q of quiz.questions){let answer=q.answers[0];
  if(q.type==='gap'){
   answer=q.gaps.map(g=>g.answers[0]);assert.equal(q.sentence.split('___').length-1,q.gaps.length);assert.equal(G.solution(q),q.answers[0]);
   assert(!G.check(q,answer.map(()=>'')));assert(!G.answered(q,answer.slice(1)));const missing=answer.slice();missing[0]=' ';assert(!G.answered(q,missing));
   for(let i=0;i<q.gaps.length;i++){for(const accepted of q.gaps[i].answers){const variant=answer.slice();variant[i]=accepted.toUpperCase();assert(G.check(q,variant));}const wrong=answer.slice();wrong[i]='väärin';assert(G.answered(q,wrong));assert(!G.check(q,wrong));}
  }else if(q.type==='wordhunt'){
   answer=q.words.slice();assert.equal(q.strip.length%5,0);assert.equal(q.words.length,q.clues.length);for(const w of q.words){const upper=w.toUpperCase();assert(q.strip.includes(upper));assert.equal(q.strip.indexOf(upper),q.strip.lastIndexOf(upper));}
   assert(!G.answered(q,answer.slice(1)));assert(!G.check(q,[answer[0],answer[0],answer[0]]));assert(G.check(q,answer.slice().reverse()));assert(G.check(q,answer.map(w=>w.toUpperCase())));
  }else if(q.type==='match'){
   answer=q.pairs.map(p=>p.right);assert.equal(new Set(answer).size,answer.length);
   assert(!G.answered(q,answer.map((x,i)=>i?'':x)));assert(!G.check(q,answer.slice(1)));
   const wrong=answer.slice();[wrong[0],wrong[1]]=[wrong[1],wrong[0]];assert(G.answered(q,wrong));assert(!G.check(q,wrong));
   assert(G.display(q,answer).includes('→'));assert.equal(G.solution(q),q.answers[0]);
  }else if(q.type==='order'){
   for(const valid of q.answers)assert(G.check(q,ordered(q,valid)),q.id);
   answer=ordered(q,q.answers[0]);assert.equal(answer.length,q.tokens.length);
   assert(!G.answered(q,answer.slice(1)));assert(!G.check(q,answer.slice().reverse()));
  }else{
   for(const valid of q.answers){assert(G.check(q,valid));assert(G.check(q,'  '+valid.toUpperCase()+' . '));}
   if(q.options){assert(q.options.includes(answer));for(const wrong of q.options.filter(x=>!q.answers.includes(x)))assert(!G.check(q,wrong),q.id);}
  }
  assert(G.answered(q,answer));assert(G.check(q,answer),q.id);assert(!G.check(q,''));assert(!G.check(q,'väärin'));
  assert(quiz.skills[q.skill]?.reviewTip);assert(q.explanation);assert(q.section<quiz.sections.length);
  rows.push({id:q.id,answered:true,correct:true});total++;
 }
 assert.equal(Review.analyze(quiz.questions,rows,quiz.sections,quiz.skills).priorities.length,0);
 const partial=rows.map(r=>({...r,answered:false,correct:false}));assert.equal(Review.analyze(quiz.questions,partial,quiz.sections,quiz.skills).missing,quiz.questions.length);
 for(const q of quiz.questions.filter(q=>q.type==='translate')){assert(q.source&&q.sourceLanguage!==q.language);assert(!G.check(q,q.source));}
 const html=fs.readFileSync(`sisalto/5/espanja/${slug}.html`,'utf8');for(const file of ['grading','interactions','quiz','review','rewards'])assert(html.includes(`assets/${file}.js`));assert(html.includes('data-rewards-remember'));assert(html.includes('shared-reward-link'));
}
const ice=load(slugs[0]),final=load(slugs[2]);
const flavours=ice.questions.filter(q=>q.type==='match').flatMap(q=>q.pairs.map(p=>p.right));assert.equal(new Set(flavours).size,12);
assert.deepEqual(final.questions.slice(0,6).map(q=>q.answers[0]),['quiero','quieres','quiere','queremos','queréis','quieren']);
assert.deepEqual(final.questions.slice(6,12).map(q=>q.answers[0]),['voy','vas','va','vamos','vais','van']);
for(const [correct,wrong] of [['sí','si'],['limón','limon'],['sandía','sandia'],['melocotón','melocoton'],['queréis','quereis'],['otoño','otono']])assert(!G.check({answers:[correct]},wrong));
assert(G.check({answers:['Sí']},'¡SÍ!'));assert(G.check({answers:['queréis']},'quere\u0301is'));
// A failed querer or ir answer must recommend that skill, not vocabulary.
const rows=final.questions.map(q=>({id:q.id,answered:true,correct:q.id!=='kpop-finaali-5'}));assert.equal(Review.analyze(final.questions,rows,final.sections,final.skills).priorities[0].id,'querer');
console.log(`OK: ${total} Spanish questions, complete/partial/wrong matches, token permutations, accents, all verb persons, 12 flavours, skill feedback and shared reward wiring.`);
