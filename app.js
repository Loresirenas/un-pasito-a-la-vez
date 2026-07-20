const fecha = document.getElementById("fecha");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const gotas = document.querySelectorAll(".drop");
const aguaTexto = document.getElementById("aguaTexto");

const campos = [
  "sueno","calidad","desayuno","almuerzo","merienda","cena",
  "tipoEjercicio","minutos","pasos","kilometros","peso","animo","notas"
];

const hoy = new Date().toISOString().slice(0,10);
fecha.value = hoy;

function clave(){
  return "upav_" + fecha.value;
}

function guardar(){
  const datos = {};

  campos.forEach(id=>{
    const e = document.getElementById(id);
    if(!e) return;
    datos[id] = e.type === "checkbox" ? e.checked : e.value;
  });

  datos.agua = Number(document.body.dataset.agua || 0);

  localStorage.setItem(clave(), JSON.stringify(datos));
  actualizarProgreso();
}

function cargar(){
  const datos = JSON.parse(localStorage.getItem(clave()) || "{}");

  campos.forEach(id=>{
    const e = document.getElementById(id);
    if(!e) return;

    if(e.type==="checkbox"){
      e.checked = !!datos[id];
    }else{
      e.value = datos[id] || "";
    }
  });

  pintarGotas(datos.agua || 0);
  actualizarProgreso();
}

function pintarGotas(cantidad){
  document.body.dataset.agua = cantidad;

  gotas.forEach((g,i)=>{
    if(i < cantidad){
      g.classList.add("active");
    }else{
      g.classList.remove("active");
    }
  });

  aguaTexto.textContent = (cantidad * 0.5).toFixed(1) + " litros";
}

gotas.forEach((gota,index)=>{
  gota.addEventListener("click",()=>{
    pintarGotas(index + 1);
    guardar();
  });
});

document.querySelectorAll("input,select,textarea").forEach(el=>{
  el.addEventListener("input",guardar);
  el.addEventListener("change",guardar);
});

fecha.addEventListener("change",cargar);

function actualizarProgreso(){

  let total = campos.length + 1;
  let completos = 0;

  campos.forEach(id=>{
    const e = document.getElementById(id);

    if(e.type === "checkbox"){
      if(e.checked) completos++;
    }else{
      if(e.value !== "") completos++;
    }
  });

  if(Number(document.body.dataset.agua || 0) > 0){
    completos++;
  }

  const porcentaje = Math.round(completos / total * 100);

  progressBar.style.width = porcentaje + "%";
  progressText.textContent = porcentaje + "% completado";
}

cargar();
