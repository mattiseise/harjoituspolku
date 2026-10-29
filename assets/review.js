(function(root){'use strict';
// Pure, deterministic assessment. No answers leave the browser.
function analyze(questions,results,sections,skills={}){
 const byId=new Map(results.map(r=>[r.id,r])),groups=new Map();let missing=0;
 for(const q of questions){const r=byId.get(q.id);const key=q.skill||'section-'+q.section;const section=sections[q.section]||{};const meta=skills[key]||section;
 if(!groups.has(key))groups.set(key,{id:key,title:meta.title||'Kertaus',tip:meta.reviewTip||'Lue tämän aiheen väärien vastausten selitykset. Peitä mallivastaus ja ratkaise samat tehtävät uudelleen. Keksi lopuksi yksi oma esimerkki.',total:0,answered:0,correct:0,wrong:[]});
 const g=groups.get(key);g.total++;if(!r||!r.answered){missing++;continue;}g.answered++;if(r.correct)g.correct++;else g.wrong.push(q.id);
 }
 const all=[...groups.values()];const priorities=all.filter(g=>g.wrong.length).sort((a,b)=>(b.wrong.length/b.answered-a.wrong.length/a.answered)||b.wrong.length-a.wrong.length||a.id.localeCompare(b.id));
 return {missing,total:questions.length,answered:questions.length-missing,priorities,strengths:all.filter(g=>g.total>=2&&g.answered===g.total&&g.correct===g.total),groups:all};
}
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function html(a){let body='<section class="review-plan" aria-label="Oma kertaussuunnitelma"><h2>Mitä kannattaa kerrata seuraavaksi?</h2><p>Arvio perustuu tämän tarkistuksen vastauksiin. Se kertoo tämän harjoituksen taidoista.</p>';
 if(!a.total||!a.answered)return body+'<p>Vastaa ensin tehtäviin. Saat sitten omiin vastauksiisi perustuvat kertausvinkit.</p></section>';
 if(a.missing)body+='<p>Täydennä vielä '+a.missing+' puuttuvaa vastausta. Niistä ei vielä arvioida osaamista.</p>';
 if(a.priorities.length){body+='<ol>'+a.priorities.slice(0,3).map(g=>'<li><h3>'+escape(g.title)+'</h3><p>'+g.correct+' / '+g.answered+' vastattua tehtävää oikein · '+g.wrong.length+' kerrattavaa.</p><p>'+escape(g.tip)+'</p></li>').join('')+'</ol><p>Aloita ensimmäisestä aiheesta. Kertaa noin viisi minuuttia, korjaa vastaukset ja tarkista uudelleen.</p>';}
 else body+='<p>Kaikki tähän mennessä vastatut tehtävät oikein! '+(a.missing?'Täydennä loput tehtävät.':'Vahvista taitoa vielä: selitä yksi ratkaisu omin sanoin ja kokeile huomenna uudelleen ilman mallivastauksia.')+'</p>';
 if(a.strengths.length)body+='<p><strong>Tässä harjoituksessa sujui:</strong> '+a.strengths.map(g=>escape(g.title)).join(', ')+'.</p>';
 if(a.priorities.length>3)body+='<p>Myös muissa aiheissa on kerrattavaa. Näet kaikki tehtäväkohtaiset selitykset vastauspalautteesta.</p>';
 return body+'</section>';
}
root.Review={analyze,html};if(typeof module!=='undefined')module.exports=root.Review;
})(typeof window!=='undefined'?window:globalThis);
