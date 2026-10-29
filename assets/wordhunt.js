(function(root){'use strict';
// Selection uses logical character indices, so a word may turn with the snake.
// Nothing depends on browser text-selection behavior or a precise finger path.
function create(q,field){
 const make=(tag,text,cls)=>{const e=document.createElement(tag);if(text)e.textContent=text;if(cls)e.className=cls;return e;};
 const help=make('p','Etsi sanat käärmeestä. Maalaa sanan alusta loppuun sormella tai hiirellä. Voit myös napauttaa sanan ensimmäistä ja viimeistä kirjainta.','interaction-help');help.id=q.id+'-help';
 const details=make('details',null,'interaction-details');details.append(make('summary','Näppäimistö ja valinnan peruminen'),make('p','Siirry käärmeeseen Tab-näppäimellä. Liiku kirjaimesta toiseen nuolinäppäimillä. Valitse sanan alku ja loppu Enterillä tai välilyönnillä. Escape peruu keskeneräisen valinnan. Sanan voi maalata myös lopusta alkuun. Jo löydetyt sanat säilyvät korostettuina.'));
 const targets=make('ul',null,'hunt-targets');targets.setAttribute('aria-label','Etsittävät sanat');
 const items=q.words.map((word,i)=>{const li=make('li',q.clues[i]);targets.append(li);return li;});
 const snake=make('div',null,'word-snake');snake.setAttribute('role','group');snake.setAttribute('aria-label','Sanasukka: kirjainkäärme');
 const live=make('p',null,'interaction-status quiet');live.setAttribute('role','status');live.setAttribute('aria-live','polite');
 const chars=Array.from(q.strip.normalize('NFC')),found=new Set(),ranges=[];let anchor=null,preview=null,press=null,moved=false,focusIndex=0;
 const buttons=[];
 function render(){buttons.forEach((b,i)=>{const selected=preview&&i>=preview[0]&&i<=preview[1],solved=ranges.some(([a,z])=>i>=a&&i<=z);b.classList.toggle('selecting',!!selected);b.classList.toggle('found-letter',solved);b.setAttribute('aria-pressed',String(!!selected||solved));b.tabIndex=i===focusIndex?0:-1;});items.forEach((li,i)=>{li.classList.toggle('found-word',found.has(q.words[i]));li.textContent=q.clues[i]+(found.has(q.words[i])?' → '+q.words[i]+' ✓':'');});}
 function range(a,b){return [Math.min(a,b),Math.max(a,b)];}
 function clearSelection(){anchor=null;preview=null;render();}
 function finish(a,b){const [start,end]=range(a,b),selected=chars.slice(start,end+1).join('');const word=q.words.find(w=>w.toLocaleUpperCase('es')===selected);
  if(word){if(found.has(word))live.textContent='Sana '+word+' on jo löydetty.';else{found.add(word);ranges.push([start,end]);live.textContent='Löysit sanan '+word+'. '+found.size+' / '+q.words.length+' löydetty.';field.dispatchEvent(new Event('input',{bubbles:true}));}}
  else live.textContent='Valinnassa ei vielä ollut etsittävää sanaa. Kokeile uudelleen.';
  clearSelection();
 }
 function choose(i){if(anchor===null){anchor=i;preview=[i,i];render();live.textContent='Alkukirjain '+chars[i]+' valittu. Valitse sanan viimeinen kirjain.';}else finish(anchor,i);}
 function at(target){const b=target?.closest('[data-hunt-letter]');return b&&snake.contains(b)?Number(b.dataset.huntLetter):null;}
 chars.forEach((char,i)=>{if(i%5===0)snake.append(make('div',null,'snake-row'));const b=make('button',char,'snake-letter');b.type='button';b.lang='es';b.dataset.huntLetter=i;b.setAttribute('aria-label',char+', '+(i+1)+' / '+chars.length);b.setAttribute('aria-describedby',help.id+' '+q.id+'-feedback');
  b.addEventListener('click',e=>{if(e.detail===0)choose(i);});b.addEventListener('focus',()=>{focusIndex=i;render();});
  b.addEventListener('keydown',e=>{moved=false;if(e.key==='Escape'){clearSelection();live.textContent='Valinta peruttu.';return;}
   const row=Math.floor(i/5),col=row%2?4-i%5:i%5;let next=i;
   if(e.key==='ArrowRight')next=i+(row%2?-1:1);else if(e.key==='ArrowLeft')next=i+(row%2?1:-1);else if(e.key==='ArrowDown'||e.key==='ArrowUp'){const r=row+(e.key==='ArrowDown'?1:-1);next=r*5+(r%2?4-col:col);}else if(e.key==='Home')next=0;else if(e.key==='End')next=chars.length-1;else return;
   e.preventDefault();if(buttons[next])buttons[next].focus({preventScroll:true});
  });buttons.push(b);snake.lastElementChild.append(b);
 });
 snake.addEventListener('pointerdown',e=>{const i=at(e.target);if(i===null||e.button!==0)return;press={index:i,x:e.clientX,y:e.clientY};moved=false;snake.setPointerCapture(e.pointerId);});
 snake.addEventListener('pointermove',e=>{if(!press)return;if(Math.hypot(e.clientX-press.x,e.clientY-press.y)>7)moved=true;const i=at(document.elementFromPoint(e.clientX,e.clientY));if(moved&&i!==null){preview=range(press.index,i);render();}});
 snake.addEventListener('pointerup',e=>{if(!press)return;const i=at(document.elementFromPoint(e.clientX,e.clientY)),start=press.index;press=null;if(moved){if(i!==null)finish(start,i);else{clearSelection();live.textContent='Valinta peruttu. Päästä irti sanan viimeisen kirjaimen kohdalla.';}}else{choose(start);moved=true;}});
 snake.addEventListener('pointercancel',()=>{press=null;moved=false;clearSelection();live.textContent='Valinta peruttu.';});
 snake.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopImmediatePropagation();moved=false;}},true);
 const creature=make('div',null,'snake-creature'+(Math.ceil(chars.length/5)%2===0?' snake-end-left':''));const face=make('div',null,'snake-face');face.setAttribute('aria-hidden','true');face.append(make('span',null,'snake-eye'),make('span',null,'snake-eye'),make('span',null,'snake-tongue'));const tail=make('div',null,'snake-tail');tail.setAttribute('aria-hidden','true');creature.append(face,snake,tail);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),motion=make('button',null,'textbutton snake-motion');motion.type='button';let moving=!reduced.matches;
 function setMotion(value){moving=value&&!reduced.matches;motion.disabled=reduced.matches;creature.classList.toggle('snake-still',!moving);motion.textContent=reduced.matches?'Käärmeen liike pois (selaimen asetus)':moving?'Pysäytä käärmeen liike':'Käynnistä käärmeen liike';motion.setAttribute('aria-pressed',String(moving));}motion.addEventListener('click',()=>setMotion(!moving));reduced.addEventListener('change',e=>{setMotion(e.matches?false:moving);});setMotion(moving);
 field.append(help,targets,creature,motion,details,live);render();return {answer:()=>q.words.filter(w=>found.has(w)),reset:()=>{found.clear();ranges.length=0;press=null;moved=false;focusIndex=0;live.textContent='';clearSelection();}};
}
root.WordHunt={create};
})(window);
