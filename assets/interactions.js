(function(root){'use strict';
const node=(tag,text,cls)=>{const e=document.createElement(tag);if(text)e.textContent=text;if(cls)e.className=cls;return e;};
const button=text=>{const b=node('button',text,'wordchip');b.type='button';return b;};
// Shared Pointer Events path for mouse, pen and touch. Every action also has
// a button operation for taps, Enter and Space. Only chips capture touch input.
function drag(chip,drop){let start=null,moved=false;
 chip.addEventListener('keydown',()=>{moved=false;});
 chip.addEventListener('pointerdown',e=>{if(e.button!==0)return;start={x:e.clientX,y:e.clientY};moved=false;chip.setPointerCapture(e.pointerId);});
 chip.addEventListener('pointermove',e=>{if(start&&Math.hypot(e.clientX-start.x,e.clientY-start.y)>8){moved=true;chip.classList.add('dragging');}});
 chip.addEventListener('pointerup',e=>{if(!start)return;start=null;chip.classList.remove('dragging');if(moved)drop(document.elementFromPoint(e.clientX,e.clientY));});
 chip.addEventListener('pointercancel',()=>{start=null;moved=false;chip.classList.remove('dragging');});
 chip.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopImmediatePropagation();moved=false;}},true);
}
function create(q,field){
 if(q.type==='wordhunt')return WordHunt.create(q,field);
 if(q.type==='gap'){
  const help=node('p','Kirjoita puuttuvat sanat suoraan virkkeen aukkoihin. Täytä kaikki aukot; älä kirjoita koko virkettä uudelleen.','interaction-help');help.id=q.id+'-help';
  const line=node('div',null,'gap-sentence');line.lang=q.language||'es';const inputs=[];
  q.sentence.split('___').forEach((part,i)=>{line.append(node('span',part));if(i>=q.gaps.length)return;const label=node('label',null,'gap-inline'),hint=node('span','Aukko '+(i+1)+(q.gaps[i].clue?' · '+q.gaps[i].clue:''),'gap-hint');hint.lang='fi';
   const input=node('input');input.type='text';input.id=q.id+'-gap-'+i;input.name=input.id;input.autocomplete='off';input.spellcheck=false;input.maxLength=80;input.setAttribute('aria-describedby',help.id+' '+q.id+'-feedback');label.append(hint,input);line.append(label);inputs.push(input);
  });field.append(help,line);return {answer:()=>inputs.map(input=>input.value),reset:()=>inputs.forEach(input=>input.value='')};
 }
 const help=node('p',null,'interaction-help');help.id=q.id+'-help';field.append(help);
 const details=node('details',null,'interaction-details');details.append(node('summary','Näppäimistö ja korjaaminen'));const instructions=node('p');details.append(instructions);
 const live=node('p',null,'quiet interaction-status');live.setAttribute('role','status');live.setAttribute('aria-live','polite');
 const changed=text=>{live.textContent=text;field.dispatchEvent(new Event('input',{bubbles:true}));};
 const describe=b=>{b.setAttribute('aria-describedby',help.id+' '+q.id+'-feedback');if(q.language)b.lang=q.language;return b;};
 if(q.type==='match'){
  instructions.textContent='Yhdistä kaikki parit. Raahaa sana kohteeseen tai valitse ensin sana ja sitten kohde napauttamalla. Näppäimistöllä: Tab ja Enter tai välilyönti. Tyhjennä pari painamalla kohdetta ilman valittua sanaa.';
  help.textContent='Raahaa sana kohteeseen tai napauta ensin sanaa ja sitten kohdetta.';
  const pool=node('div',null,'wordbank'),targets=node('div',null,'match-targets');pool.setAttribute('role','group');pool.setAttribute('aria-label','Yhdistettävät sanat');targets.setAttribute('role','group');targets.setAttribute('aria-label','Yhdistämisen kohteet');
  let values=q.pairs.map(()=>''),selected=null;
  const options=q.choices||q.pairs.map(p=>p.right).slice().reverse();const chips=[],slots=[];
  function render(){chips.forEach((b,i)=>{b.setAttribute('aria-pressed',String(selected===options[i]));b.classList.toggle('assigned',values.includes(options[i]));});slots.forEach((b,i)=>{b.textContent=q.pairs[i].left+' → '+(values[i]||'Valitse sana');});}
  function place(i,value){values=values.map(v=>v===value?'':v);values[i]=value;selected=null;render();changed(q.pairs[i].left+': '+value);}
  options.forEach(value=>{const b=describe(button(value));chips.push(b);b.addEventListener('click',()=>{selected=selected===value?null:value;render();live.textContent=selected?'Valittu '+value+'. Valitse kohde.':'Valinta poistettu.';});drag(b,target=>{const slot=target?.closest('[data-match-slot]');if(slot&&targets.contains(slot))place(Number(slot.dataset.matchSlot),value);});pool.append(b);});
  q.pairs.forEach((p,i)=>{const b=describe(button());b.lang='fi';b.dataset.matchSlot=i;b.addEventListener('click',()=>{if(selected!==null)place(i,selected);else{values[i]='';render();changed(p.left+': pari tyhjennetty.');}});slots.push(b);targets.append(b);});
  field.append(pool,targets,details,live);render();return {answer:()=>values.slice(),reset:()=>{values=values.map(()=>'');selected=null;render();live.textContent='';}};
 }
 instructions.textContent='Rakenna lause kaikista sanapalikoista. Napauta sanoja järjestyksessä tai raahaa ne lausealueelle. Poista sana napauttamalla sitä lauseessa. Näppäimistöllä: Tab ja Enter tai välilyönti. Siirrä lauseen sanaa Alt + vasen/oikea nuoli.';
 help.textContent='Napauta sanat lauseeseen oikeassa järjestyksessä tai raahaa ne lausealueelle.';
 const pool=node('div',null,'wordbank'),line=node('div',null,'sentence-line');line.setAttribute('role','group');line.setAttribute('aria-label','Rakennettava lause');pool.setAttribute('role','group');pool.setAttribute('aria-label','Sanapalikat');
 let order=[];
 const chips=q.tokens.map((word,i)=>{const b=describe(button(word));b.dataset.token=i;b.addEventListener('click',()=>move(i,order.includes(i)?'remove':null));b.addEventListener('keydown',e=>{if(e.altKey&&['ArrowLeft','ArrowRight'].includes(e.key)&&order.includes(i)){e.preventDefault();const at=order.indexOf(i),to=at+(e.key==='ArrowLeft'?-1:1);if(to>=0&&to<order.length){[order[at],order[to]]=[order[to],order[at]];refresh(i);}}});drag(b,target=>{if(!line.contains(target)&&target!==line)return;const token=target?.closest('[data-token]');move(i,token?Number(token.dataset.token):null);});return b;});
 function render(){q.tokens.forEach((_,i)=>{const used=order.includes(i);chips[i].setAttribute('aria-label',q.tokens[i]+(used?': poista lauseesta':': lisää lauseeseen'));if(!used)pool.append(chips[i]);});order.forEach(i=>line.append(chips[i]));line.classList.toggle('empty-sentence',!order.length);}
 function refresh(focus){render();chips[focus]?.focus({preventScroll:true});changed('Lause: '+order.map(i=>q.tokens[i]).join(' '));}
 function move(i,before){if(before===i)return;order=order.filter(n=>n!==i);if(before!=='remove'){const pos=before===null?-1:order.indexOf(before);if(pos<0)order.push(i);else order.splice(pos,0,i);}refresh(i);}
 field.append(pool,line,details,live);render();return {answer:()=>order.map(i=>q.tokens[i]),reset:()=>{order=[];render();live.textContent='';}};
}
root.Interactions={create};
})(window);
