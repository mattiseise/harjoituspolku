'use strict';
// Independent linguistic fixtures, checked against the supplied textbook photos:
// pp. 186-189, 192-195, 202-207 and 210. The photos are not repository assets.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const G=require('../assets/grading.js'),R=require('../assets/review.js');
const load=slug=>{const s={window:{}};vm.runInNewContext(fs.readFileSync(`sisalto/5/espanja/${slug}.js`,'utf8'),s);return JSON.parse(JSON.stringify(s.window.QUIZ));};
const ice=load('jaatelobaari'),weather=load('saaseikkailu'),final=load('kpop-finaali');
const at=(quiz,n)=>quiz.questions.find(q=>q.id.endsWith('-'+n));
let cases=0;
function accepted(q,values){for(const value of values){assert(G.check(q,value),`${q.id} must accept ${JSON.stringify(value)}`);cases++;}}
function rejected(q,values){for(const value of values){assert(!G.check(q,value),`${q.id} must reject ${JSON.stringify(value)}`);cases++;}}
function pairs(q,expected){assert.deepEqual(q.pairs.map(p=>p.right),expected);accepted(q,[expected]);for(let i=0;i<expected.length;i++){const wrong=expected.slice();wrong[i]=expected[(i+1)%expected.length];rejected(q,[wrong]);}}
pairs(at(ice,1),['fresa','frambuesa','limón','chocolate']);
pairs(at(ice,2),['menta','vainilla','sandía','pera']);
pairs(at(ice,3),['melocotón','melón','pistacho','cereza']);
pairs(at(weather,1),['la primavera','el verano','el otoño','el invierno']);
pairs(at(weather,2),['Hace viento','Hace sol','Llueve','Nieva']);
pairs(at(final,13),['una sorpresa','pronto','viajar','una aventura']);
pairs(at(final,14),['además','donde','sin','perdón']);
pairs(at(final,24),['todavía','¡Qué pena!','un conejito','un aventurero']);
rejected(at(final,14),[['además','dónde','sin','perdón']]);
assert(at(final,14).pairs[1].left.includes('ei kysymys'));
assert(at(final,14).explanation.includes('¿Dónde estás?'));

const forms=['quiero','quieres','quiere','queremos','queréis','quieren','voy','vas','va','vamos','vais','van'];
forms.forEach((correct,i)=>{accepted(at(final,i+1),[correct,correct.toUpperCase()]);rejected(at(final,i+1),forms.filter(x=>x!==correct));});
rejected(at(final,2),['tu quieres']);rejected(at(final,3),['el quiere']);rejected(at(final,5),['quereis','vosotros quieren']);
accepted(at(ice,9),['Sí']);rejected(at(ice,9),['Si','No']);
accepted(at(ice,10),['limón','el limón']);rejected(at(ice,10),['limon','el limon','melón']);
accepted(at(ice,11),['sandía','la sandía']);rejected(at(ice,11),['sandia','melón','la melón']);
accepted(at(ice,12),['melocotón','el melocotón','durazno','el durazno']);rejected(at(ice,12),['melocoton','melón','durásno']);
accepted(at(ice,14),['Quiero un helado de menta.','Yo quiero un helado de menta']);
rejected(at(ice,14),['Quiere un helado de menta','Quiero un helado de vainilla','No quiero un helado de menta']);
accepted(at(ice,15),['No, no quiero','No,no quiero','No ,no quiero','No, yo no quiero','No no quiero']);
rejected(at(ice,15),['Sí, quiero','No, no quiere','No, quiero','No, yo no quieren']);
accepted(at(ice,17),[['quiero','vainilla']]);rejected(at(ice,17),[['quiere','vainilla'],['quiero','menta'],['quiero','']]);
accepted(at(ice,18),[['gusta']]);rejected(at(ice,18),[['gustan'],['gusto'],['me gusta']]);
accepted(at(ice,19),['Queremos dos bolas','Nosotras queremos dos bolas','Nosotros queremos dos bolas']);
rejected(at(ice,19),['Quieren dos bolas','Queremos dos bola','Queremos tres bolas']);
accepted(at(ice,20),['En halua suklaajäätelöä','Minä en halua suklaanmakuista jäätelöä']);
rejected(at(ice,20),['Haluan suklaajäätelöä','Emme halua suklaajäätelöä','En halua suklaajäätelön']);

for(const [n,right,wrong] of [[3,'Está','Hay'],[4,'Hay','Está'],[5,'frío','calor'],[6,'otoño','verano'],[7,'bajo','de'],[8,'buen','bueno'],[11,'Hace calor','Está calor'],[12,'Hace mal tiempo','Hace malo tiempo'],[13,'Llueve','Nieva'],[14,'la primavera','el primavera'],[15,'el invierno','la invierno']]){accepted(at(weather,n),[right]);rejected(at(weather,n),[wrong]);}
accepted(at(weather,10),[['Hace','frío','y','nieva'],['nieva','y','Hace','frío']]);
rejected(at(weather,10),[['Hace','y','frío','nieva']]);
accepted(at(weather,17),[['verano','calor']]);rejected(at(weather,17),[['invierno','calor'],['verano','frío']]);
accepted(at(weather,18),[['está']]);rejected(at(weather,18),[['esta'],['hace'],['hay']]);
accepted(at(weather,19),['Hace frío y nieva','Nieva y hace frío','Hace frío y está nevando']);
rejected(at(weather,19),['Hace frio y nieva','Hace calor y nieva','Hace frío y llueve']);
accepted(at(weather,20),['Talvella on kylmä','On kylmää talvella']);rejected(at(weather,20),['Kesällä on kylmä','Talvella on kuuma']);
accepted(at(final,20),[['queremos','van']]);rejected(at(final,20),[['quieren','van'],['queremos','vamos']]);
accepted(at(final,21),[['queréis','vamos']]);rejected(at(final,21),[['quereis','vamos'],['quieren','vamos'],['queréis','vais']]);
accepted(at(final,22),['Quiero viajar','Yo quiero viajar']);rejected(at(final,22),['Quiero viajo','Quiere viajar','No quiero viajar']);
accepted(at(final,23),['Meillä on sinulle yllätys','Meillä on yllätys sinua varten','Sinulle meillä on yllätys']);
rejected(at(final,23),['Minulla on sinulle yllätys','Meillä on hänelle yllätys','Meillä ei ole sinulle yllätystä']);
accepted(at(final,25),['tón']);rejected(at(final,25),['me','lo','co','ton']);
accepted(at(final,26),['helado']);rejected(at(final,26),['sandía','Daniela']);

for(const quiz of [ice,weather,final]){
 const q=quiz.questions.find(q=>q.type==='wordhunt');
 accepted(q,[q.words.slice().reverse()]);
 rejected(q,[Array(q.words.length).fill(q.words[0]),[...q.words.slice(1),q.words[1]],[]]);
 for(const word of q.words){const start=q.strip.indexOf(word.toUpperCase());assert(start>=0);assert.equal(q.strip.slice(start,start+word.length),word.toUpperCase());}
 const rows=quiz.questions.map(q=>({id:q.id,answered:true,correct:true}));
 assert.equal(R.analyze(quiz.questions,rows,quiz.sections,quiz.skills).priorities.length,0);
}
// A mixed verb/flavour gap cannot misleadingly recommend only verb practice.
assert.equal(at(ice,17).skill,'tilaus');assert(ice.skills.tilaus.reviewTip.includes('vainilla'));
const rows=final.questions.map(q=>({id:q.id,answered:true,correct:!['kpop-finaali-25','kpop-finaali-26'].includes(q.id)}));
assert.equal(R.analyze(final.questions,rows,final.sections,final.skills).priorities[0].id,'aantaminen');
console.log(`OK: ${cases} independent Spanish content acceptance/rejection cases; textbook vocabulary, conjugations, accents, translations, pronunciation identification and review categories.`);
