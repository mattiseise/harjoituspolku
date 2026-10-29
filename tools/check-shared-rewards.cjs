const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const code=fs.readFileSync('assets/rewards.js','utf8');
function storage(){const map=new Map();return {getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)};}
function page(localStorage,sessionStorage){const c={localStorage,sessionStorage,structuredClone};vm.createContext(c);vm.runInContext(code,c);return c.Rewards;}
const local=storage(),session=storage();let a=page(local,session);
assert.equal(a.begin('suomi-1','Suomen koe'),'suomi-1');a.update('suomi-1',{booster:{ids:['x','y','z'],opened:true},cardChosen:'x'});a.syncCards(['x']);
let b=page(local,session);assert.equal(b.read().cards[0],'x');assert.equal(b.ticket('suomi-1').cardChosen,'x');assert.equal(b.ticket('suomi-1').booster.opened,true);b.begin('suomi-1','Korjaustarkistus');assert.equal(b.ticket('suomi-1').cardChosen,'x');
assert.equal(b.begin('espanja-1','Espanjan koe'),'espanja-1');b.syncCards(['x','y']);assert.equal(b.read().cards.length,2);assert.equal(a.read().cards.length,2);
// Session-only collection does not silently opt into persistent storage.
assert.equal(local.getItem('harjoituspolku-rewards-v1'),null);assert.equal(page(local,storage()).read().cards.length,0);
b.setRemember(true);assert.equal(page(local,storage()).read().cards.length,2);b.setRemember(false);assert.equal(local.getItem('harjoituspolku-rewards-v1'),null);assert.equal(page(local,session).read().cards.length,2);
const legacyLocal=storage();legacyLocal.setItem('kieli-rytmi-5lk-v3',JSON.stringify({version:3,cards:['old-card']}));const migrated=page(legacyLocal,storage());assert.equal(migrated.syncCards([])[0],'old-card');assert(migrated.read().remember);migrated.clear();assert.equal(migrated.read().cards.length,0);
const blocked={getItem(){throw Error('blocked')},setItem(){throw Error('blocked')},removeItem(){}};assert.equal(page(blocked,blocked).begin('no-storage','Koe'),null);
const html=fs.readFileSync('sisalto/5/suomen-kieli/kpop/index.html','utf8');assert(html.includes(code.replace(/\r\n/g,'\n')));assert(fs.readFileSync('sisalto/5/suomen-kieli/perusteet.html','utf8').includes('assets/rewards.js'));assert(fs.readFileSync('sisalto/5/espanja/pohja.html','utf8').includes('data-rewards-count'));
console.log('OK: shared Finnish/Spanish tickets, one ticket per attempt, cross-page collection, duplicate merge, session-only and remembered storage, old K-pop migration, clearing and unavailable storage.');
