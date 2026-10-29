(function(root){'use strict';
const normalize=s=>String(s).normalize('NFC').toLocaleLowerCase('fi').trim().replace(/^[¡¿]+/,'').replace(/[.!?\s]+$/,'').trim().replace(/\s+/g,' ');
const answered=(q,a)=>q.type==='wordhunt'?Array.isArray(a)&&a.length===q.words.length:q.type==='match'?Array.isArray(a)&&a.length===q.pairs.length&&a.every(x=>!!normalize(x)):q.type==='order'?Array.isArray(a)&&a.length===q.tokens.length:a!=null&&!!normalize(a);
const display=(q,a)=>Array.isArray(a)?q.type==='match'?q.pairs.map((p,i)=>p.left+' → '+(a[i]||'(tyhjä)')).join('; '):a.join(q.type==='wordhunt'?', ':' '):String(a||'');
const solution=q=>q.type==='wordhunt'?q.words.join(', '):q.type==='match'?q.pairs.map(p=>p.left+' → '+p.right).join('; '):q.answers[0];
const check=(q,a)=>answered(q,a)&&(q.type==='wordhunt'?q.words.every(w=>a.some(x=>normalize(x)===normalize(w))):q.type==='match'?a.every((x,i)=>normalize(x)===normalize(q.pairs[i].right)):q.answers.some(x=>normalize(x)===normalize(q.type==='order'?a.join(' '):a)));
root.Grading={normalize,answered,display,solution,check};if(typeof module!=='undefined')module.exports=root.Grading;
})(typeof window!=='undefined'?window:globalThis);
