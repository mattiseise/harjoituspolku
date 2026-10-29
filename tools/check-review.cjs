const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const R=require('../assets/review.js'),G=require('../assets/grading.js');
const sections=[{title:'Sanasto',reviewTip:'Peitä sanat.'},{title:'Verbit',reviewTip:'Taivuta.'}];
const qs=Array.from({length:8},(_,i)=>({id:'q'+i,section:i<4?0:1}));
const result=(correct,answered=8)=>qs.slice(0,answered).map((q,i)=>({id:q.id,answered:true,correct:correct.includes(i)}));
let p=R.analyze(qs,result([0,1,2,3,4]),sections);assert.equal(p.priorities[0].title,'Verbit');assert.equal(p.strengths[0].title,'Sanasto');assert.equal(p.missing,0);
p=R.analyze(qs,result([],0),sections);assert.equal(p.priorities.length,0);assert.equal(p.missing,8);assert(!R.html(p).includes('Kaikki tähän'));
p=R.analyze(qs,result([0,1],2),sections);assert.equal(p.priorities.length,0);assert.equal(p.strengths.length,0);assert.equal(p.missing,6);
p=R.analyze(qs,result([0,1,2,3,4,5,6,7]),sections);assert.equal(p.priorities.length,0);assert.equal(p.strengths.length,2);assert(R.html(p).includes('huomenna'));
// Incorrect-but-answered items drive ranking, never unanswered items.
p=R.analyze(qs,[{id:'q0',answered:false,correct:false},{id:'q4',answered:true,correct:false}],sections);assert.equal(p.priorities.length,1);assert.equal(p.priorities[0].title,'Verbit');
const skills={accent:{title:'Aksentit <script>',reviewTip:'sí & si'}};
p=R.analyze([{id:'one',section:0,skill:'accent'}],[{id:'one',answered:true,correct:false}],sections,skills);assert.equal(p.priorities[0].id,'accent');assert(R.html(p).includes('&lt;script&gt;'));assert(!R.html(p).includes('<script>'));
assert(!G.check({answers:['sí']},'si'));assert(!G.check({answers:['año']},'ano'));assert(G.check({answers:['sí']},' SI\u0301 . '));assert(G.check({answers:['¿Cómo estás?']},'¿CÓMO ESTÁS?'));
const draft={window:{}};vm.runInNewContext(fs.readFileSync('sisalto/5/espanja/pohja.js','utf8'),draft);assert.equal(draft.window.QUIZ.status,'draft');assert.equal(draft.window.QUIZ.questions.length,0);
// Every active quiz uses the same engine. Offline copy must exactly match.
const html=fs.readFileSync('sisalto/5/suomen-kieli/kpop/index.html','utf8').replace(/\r\n/g,'\n');assert(html.includes(fs.readFileSync('assets/review.js','utf8').replace(/\r\n/g,'\n')));assert(html.includes('${reviewPlan(quiz,r)}'));
const code=html.match(/<script>([\s\S]*?)<\/script>/)[1];const bank=JSON.parse(code.match(/const BANK=([\s\S]*?);\s*const ART=/)[1]);
for(const quiz of bank){const questions=quiz.sections.flatMap((s,i)=>s.questions.map(q=>({...q,section:i})));const rows=questions.map(q=>({id:q.id,answered:true,correct:q.section!==2}));const analysis=R.analyze(questions,rows,quiz.sections,quiz.skills);assert.equal(analysis.priorities[0].title,'Verbien aikamuodot');assert(analysis.priorities[0].tip.includes('teen'));assert(analysis.strengths.length>=3);assert.equal(R.analyze(questions,rows.map(r=>({...r,correct:true})),quiz.sections).priorities.length,0);}
console.log('OK: missing/partial/perfect/mixed answers, priorities, strengths, corrections, skill metadata, escaping, Spanish accents, draft gate and all three offline quiz assessments.');
