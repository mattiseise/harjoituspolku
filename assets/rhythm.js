(function(root){'use strict';
// The same section-by-section presentation as the Finnish Kieli & rytmi exams.
// Sections stay mounted: moving between views never reconstructs an answer.
let current=0,readAnswer=null;
const make=(tag,text,cls)=>{const e=document.createElement(tag);if(text)e.textContent=text;if(cls)e.className=cls;return e;};
const byId=id=>document.getElementById(id);
const announce=text=>{byId('quiz-announcement').textContent=text;};
function showSection(index,questionId){
 current=Math.max(0,Math.min(QUIZ.sections.length-1,index));
 byId('quiz-workspace').hidden=false;byId('result-view').hidden=true;
 document.querySelectorAll('.questionsection').forEach((section,i)=>{section.hidden=i!==current;});
 document.querySelectorAll('.section-tab').forEach((tab,i)=>{tab.setAttribute('aria-current',i===current?'step':'false');if(i===current&&matchMedia('(max-width:650px)').matches)tab.scrollIntoView({block:'nearest',inline:'center',behavior:'instant'});});
 byId('section-position').textContent='Osio '+(current+1)+' / '+QUIZ.sections.length;
 byId('previous-section').disabled=current===0;
 byId('next-section').hidden=current===QUIZ.sections.length-1;
 byId('last-section-check').hidden=current!==QUIZ.sections.length-1;
 const section=byId('osio-'+current),heading=section.querySelector('h2');heading.tabIndex=-1;
 history.replaceState(null,'',location.pathname+location.search+'#osio-'+current);
 if(questionId){const field=byId(questionId);field.scrollIntoView({block:'center',behavior:'instant'});field.querySelector('input,select,button:not(.snake-motion)')?.focus({preventScroll:true});}
 else{heading.scrollIntoView({block:'start',behavior:'instant'});heading.focus({preventScroll:true});}
 announce('Osio '+(current+1)+': '+QUIZ.sections[current].title+'. Vastauksesi säilyvät osioiden välillä.');
}
function update(answer){
 const total=QUIZ.questions.length,count=QUIZ.questions.filter(q=>Grading.answered(q,answer(q))).length;
 byId('progress').max=total;byId('progress').value=count;byId('progresslabel').textContent=count+' / '+total;
 QUIZ.sections.forEach((_,i)=>{const questions=QUIZ.questions.filter(q=>q.section===i),done=questions.filter(q=>Grading.answered(q,answer(q))).length;const label=byId('section-count-'+i);if(label)label.textContent=done+' / '+questions.length;});
}
function init(answer){
 readAnswer=answer;document.querySelectorAll('[data-quiz-count]').forEach(e=>e.textContent=QUIZ.questions.length);
 const nav=byId('sections');nav.replaceChildren();
 QUIZ.sections.forEach((section,i)=>{const button=make('button',null,'section-tab');button.type='button';button.setAttribute('aria-label','Osio '+(i+1)+': '+section.title);button.title=section.title;const count=make('span',null,'tab-count');count.id='section-count-'+i;button.append(make('span',String(i+1),'tab-num'),make('span',section.title,'tab-text'),count);button.addEventListener('click',()=>showSection(i));nav.append(button);});
 byId('previous-section').addEventListener('click',()=>showSection(current-1));byId('next-section').addEventListener('click',()=>showSection(current+1));
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),motion=byId('page-motion'),setting=byId('motion');
 function setMotion(on){on=on&&!reduced.matches;document.body.classList.toggle('motion-on',on);document.body.classList.toggle('motion-off',!on);setting.checked=on;motion.disabled=reduced.matches;motion.setAttribute('aria-pressed',String(on));motion.setAttribute('aria-label',on?'Poista animaatiot käytöstä':'Ota animaatiot käyttöön');motion.textContent=reduced.matches?'◇ Liike: selaimen asetus':on?'◇ Liike: päällä':'◇ Liike: pois';document.dispatchEvent(new CustomEvent('rhythm-motion-change',{detail:{enabled:on}}));}
 motion.addEventListener('click',()=>setMotion(!document.body.classList.contains('motion-on')));setting.addEventListener('change',()=>setMotion(setting.checked));reduced.addEventListener('change',()=>setMotion(!reduced.matches));setMotion(!reduced.matches);
 update(answer);const match=location.hash.match(/^#osio-(\d+)$/);current=match?Math.min(Number(match[1]),QUIZ.sections.length-1):0;
 // Initial loading keeps the banner in view; subsequent section changes focus it.
 document.querySelectorAll('.questionsection').forEach((section,i)=>{section.hidden=i!==current;});document.querySelectorAll('.section-tab').forEach((tab,i)=>tab.setAttribute('aria-current',i===current?'step':'false'));byId('section-position').textContent='Osio '+(current+1)+' / '+QUIZ.sections.length;byId('previous-section').disabled=current===0;byId('next-section').hidden=current===QUIZ.sections.length-1;byId('last-section-check').hidden=current!==QUIZ.sections.length-1;
}
function sectionSummary(result,answer){
 const grid=make('div',null,'score-grid');
 QUIZ.sections.forEach((section,i)=>{const questions=QUIZ.questions.filter(q=>q.section===i),done=questions.filter(q=>Grading.answered(q,answer(q))).length,correct=questions.filter(q=>Grading.check(q,answer(q))).length;const button=make('button',null,'section-score');button.type='button';button.append(make('span',section.title),make('strong',correct+' / '+questions.length+' oikein'),make('small',done+' / '+questions.length+' vastattu · Palaa osioon →'));button.addEventListener('click',()=>{const missing=questions.find(q=>!Grading.answered(q,answer(q)));showSection(i,missing?.id);});grid.append(button);});result.append(grid);
}
function showResult({answer,score,filled}){
 byId('quiz-workspace').hidden=true;byId('result-view').hidden=false;
 const complete=filled===QUIZ.questions.length,result=byId('result'),controls=make('div',null,'row-buttons result-actions');
 const back=make('button','Palaa korjaamaan vastauksia','button secondary');back.type='button';back.addEventListener('click',()=>showSection(current));controls.append(back);
 const missing=QUIZ.questions.find(q=>!Grading.answered(q,answer(q)));
 if(missing){const resume=make('button','Jatka puuttuvista vastauksista →','button');resume.type='button';resume.addEventListener('click',()=>showSection(missing.section,missing.id));controls.append(resume);}
 result.append(controls);
 const reward=byId('reward');reward.hidden=false;reward.querySelector('h2').textContent=complete?'Oma korttibuusterisi':'Korttibuusteri odottaa';reward.querySelector('p:not(.eyebrow)').textContent=complete?'Harjoitus tehty! Valitse yksi viidestä uudesta kortista yhteiseen kokoelmaasi.':'Vastaa vielä kaikkiin tehtäviin ja tarkista uudelleen. Täysiä pisteitä ei tarvita.';reward.classList.toggle('reward-pending',!complete);if(!complete){byId('shared-reward-link').hidden=true;byId('shared-reward-error').hidden=true;}
 const review=byId('answer-review');review.replaceChildren();const head=make('div',null,'review-head');head.append(make('h2','Vastaukset ja selitykset'));const filters=make('div',null,'filter-group');filters.setAttribute('role','group');filters.setAttribute('aria-label','Näytettävät vastaukset');head.append(filters);const list=make('div');review.append(head,list);
 const rows=QUIZ.questions.map((q,i)=>({q,i,a:answer(q),done:Grading.answered(q,answer(q)),ok:Grading.check(q,answer(q))}));let selected='all';const filterButtons=[];
 function render(){list.replaceChildren();const matches=rows.filter(row=>selected==='all'||selected==='wrong'&&row.done&&!row.ok||selected==='missing'&&!row.done);filterButtons.forEach(({button,key})=>button.setAttribute('aria-pressed',String(key===selected)));
  if(!matches.length){list.append(make('p','Tässä näkymässä ei ole tehtäviä.','empty-state'));return;}
  matches.forEach(({q,i,a,done,ok})=>{const item=make('article',null,'review-item');const status=make('span',ok?'✓ Oikein':done?'Kerrattavaa':'Vastaus kesken',ok?'status-chip good':done?'status-chip wrong':'status-chip');const prompt=make('p',(i+1)+'. '+q.prompt,'review-question');item.append(status,make('p',QUIZ.sections[q.section].title,'eyebrow'),prompt);if(q.source){const source=make('blockquote',q.source,'translation-source');source.lang=q.sourceLanguage||'es';item.append(source);}if(q.sentence){const sentence=make('p',q.sentence,'review-answer');sentence.lang='es';item.append(sentence);}const response=make('p',null,'review-answer');response.append(document.createTextNode('Vastauksesi: '),make('span',Grading.display(q,a)||'(tyhjä)','answer-value'));item.append(response);if(!ok)item.append(make('p','Mallivastaus: '+Grading.solution(q),'review-answer'));item.append(make('p',q.explanation,'review-explanation'));const link=make('button',ok?'Palaa tehtävään →':'Korjaa vastausta →','button secondary small');link.type='button';link.addEventListener('click',()=>showSection(q.section,q.id));const links=make('div',null,'review-links');links.append(link);item.append(links);list.append(item);});
 }
 [['all','Kaikki'],['wrong','Kerrattavat'],['missing','Puuttuvat']].forEach(([key,label])=>{const count=rows.filter(row=>key==='all'||key==='wrong'&&row.done&&!row.ok||key==='missing'&&!row.done).length;const button=make('button',label+' ('+count+')','filter');button.type='button';button.addEventListener('click',()=>{selected=key;render();});filterButtons.push({button,key});filters.append(button);});render();
 history.replaceState(null,'',location.pathname+location.search+'#tulos');result.scrollIntoView({block:'start',behavior:'instant'});announce(complete?'Harjoitus valmis. '+score+' / '+QUIZ.questions.length+' oikein. Korttibuusteri on valmis.':'Tarkistettu: '+filled+' / '+QUIZ.questions.length+' vastattu. '+(QUIZ.questions.length-filled)+' vastausta puuttuu.');
}
function confirmReset(onConfirm){
 const previous=document.activeElement,dialog=make('dialog',null,'reset-dialog'),title=make('h2','Tyhjennetäänkö tämän kokeen vastaukset?');title.id='reset-dialog-title';dialog.setAttribute('aria-labelledby',title.id);dialog.append(title,make('p','Tämän harjoituskerran vastaukset ja tulokset poistuvat. Yhteinen korttikokoelma säilyy.'));
 const actions=make('div',null,'row-buttons'),cancel=make('button','Peruuta','button secondary'),confirm=make('button','Tyhjennä vastaukset','button');cancel.type=confirm.type='button';actions.append(cancel,confirm);dialog.append(actions);
 function finish(accepted){dialog.close();dialog.remove();if(accepted)onConfirm();else previous?.focus();}
 cancel.addEventListener('click',()=>finish(false));confirm.addEventListener('click',()=>finish(true));dialog.addEventListener('cancel',e=>{e.preventDefault();finish(false);});document.body.append(dialog);dialog.showModal();cancel.focus();
}
root.Rhythm={init,update,showSection,sectionSummary,showResult,confirmReset,reset:()=>showSection(0)};
})(window);
