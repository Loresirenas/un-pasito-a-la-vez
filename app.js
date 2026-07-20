const today=new Date().toLocaleDateString('es-ES',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
document.getElementById('today').textContent=today;
const key='upav_'+new Date().toISOString().slice(0,10);
const ids=['sleep','sleepQuality','breakfast','lunch','snack','dinner','water','exercise','minutes','steps','weight','mood','notes'];
function save(){
 let d={};
 ids.forEach(id=>{
   let e=document.getElementById(id);
   d[id]=e.type==='checkbox'?e.checked:e.value;
 });
 localStorage.setItem(key,JSON.stringify(d));
 updateProgress();
}
function load(){
 let d=JSON.parse(localStorage.getItem(key)||'{}');
 ids.forEach(id=>{
   let e=document.getElementById(id);
   if(!e)return;
   if(e.type==='checkbox')e.checked=!!d[id];
   else if(d[id]!=null)e.value=d[id];
 });
 document.getElementById('waterLabel').textContent=((document.getElementById('water').value||0)*0.5).toFixed(1);
 updateProgress();
}
function updateProgress(){
 const checks=[...document.querySelectorAll('.track')];
 let done=0;
 checks.forEach(e=>{
   if(e.type==='checkbox'&&e.checked)done++;
   else if(e.type!=='checkbox'&&e.value!=='')done++;
 });
 let pct=Math.round(done/checks.length*100);
 document.getElementById('progressBar').style.width=pct+'%';
 document.getElementById('progressText').textContent=pct+'% completado';
}
document.querySelectorAll('input,select,textarea').forEach(e=>{
 e.addEventListener('input',()=>{if(e.id==='water')document.getElementById('waterLabel').textContent=(e.value*0.5).toFixed(1);save();});
 e.addEventListener('change',save);
});
load();
