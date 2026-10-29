(function(root){'use strict';
const KEY='harjoituspolku-rewards-v1',LEGACY='kieli-rytmi-5lk-v3';let fallback={version:1,cards:[],tickets:{},remember:false},available=true;
const parse=x=>{try{return JSON.parse(x||'null');}catch(_){return null;}};
function read(){try{const saved=parse(localStorage.getItem(KEY))||parse(sessionStorage.getItem(KEY));if(saved?.version===1)fallback=saved;else{const old=parse(localStorage.getItem(LEGACY));if(old?.version===3){fallback.cards=[...new Set([...fallback.cards,...(old.cards||[])])];fallback.remember=true;}}}catch(_){available=false;}return structuredClone(fallback);}
function write(state){fallback=structuredClone(state);try{sessionStorage.setItem(KEY,JSON.stringify(state));if(state.remember)localStorage.setItem(KEY,JSON.stringify(state));else localStorage.removeItem(KEY);available=true;}catch(_){available=false;}return available;}
function syncCards(ids){const state=read();state.cards=[...new Set([...state.cards,...ids])];write(state);return state.cards;}
function setRemember(value){const state=read();state.remember=!!value;write(state);if(!value){try{localStorage.removeItem(LEGACY);}catch(_){}}return available;}
function begin(id,title){const state=read();if(!state.tickets[id])state.tickets[id]={title,booster:null,cardChosen:null};return write(state)?id:null;}
function ticket(id){return read().tickets[id]||null;}
function update(id,value){const state=read();if(state.tickets[id])state.tickets[id]={...state.tickets[id],booster:value.booster,cardChosen:value.cardChosen};write(state);}
function clear(){fallback={version:1,cards:[],tickets:{},remember:false};try{localStorage.removeItem(KEY);localStorage.removeItem(LEGACY);sessionStorage.removeItem(KEY);sessionStorage.removeItem(LEGACY);}catch(_){available=false;}}
const scriptURL=typeof document!=='undefined'?document.currentScript?.src:null;
function url(id){const target=scriptURL?new URL('../sisalto/5/suomen-kieli/kpop/index.html',scriptURL):new URL('index.html',location.href);target.search=id?'palkinto='+encodeURIComponent(id):'palkinnot=1';return target.href;}
function refresh(){if(typeof document==='undefined')return;const s=read();document.querySelectorAll('[data-rewards-count]').forEach(e=>e.textContent='Yhteinen korttikokoelma: '+s.cards.length+' / 50');document.querySelectorAll('[data-rewards-remember]').forEach(e=>{e.textContent='Muista tällä laitteella: '+(s.remember?'päällä':'pois');e.setAttribute('aria-pressed',String(s.remember));});document.querySelectorAll('[data-rewards-note]').forEach(e=>e.textContent=!available?'Selain ei salli kokoelman tallennusta.':s.remember?'Kortit muistetaan tässä selaimessa myös myöhemmin.':'Kortit säilyvät tässä välilehdessä sivulta toiselle tämän käyttökerran ajan.');}
if(typeof document!=='undefined')document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('[data-rewards-remember]').forEach(e=>e.addEventListener('click',()=>{setRemember(!read().remember);refresh();}));refresh();});
root.Rewards={read,syncCards,setRemember,begin,ticket,update,clear,url,refresh,isAvailable:()=>available};if(typeof module!=='undefined')module.exports=root.Rewards;
})(typeof window!=='undefined'?window:globalThis);
