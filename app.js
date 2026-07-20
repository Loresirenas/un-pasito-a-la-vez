// ===========================
// UN PASITO A LA VEZ - V1
// ===========================

// Fecha
const fecha = document.getElementById("fecha");

// Campos
const sueno = document.getElementById("sueno");
const desayuno = document.getElementById("desayuno");
const almuerzo = document.getElementById("almuerzo");
const merienda = document.getElementById("merienda");
const cena = document.getElementById("cena");

const ejercicio = document.getElementById("ejercicio");
const minutos = document.getElementById("minutos");

const pasos = document.getElementById("pasos");
const kilometros = document.getElementById("kilometros");

const peso = document.getElementById("peso");
const animo = document.getElementById("animo");
const notas = document.getElementById("notas");

const gotas = document.querySelectorAll(".gota");
const litros = document.getElementById("litros");

const guardarBtn = document.getElementById("guardarBtn");
const mensajeGuardado = document.getElementById("mensajeGuardado");

const exportarBtn = document.getElementById("exportarBtn");

let agua = 0;

// ---------------------------
// Fecha de hoy
// ---------------------------

const hoy = new Date().toISOString().split("T")[0];

if (!fecha.value) {
    fecha.value = hoy;
}

// ---------------------------
// Clave LocalStorage
// ---------------------------

function clave() {
    return "pasito_" + fecha.value;
}

// ---------------------------
// Guardar
// ---------------------------

function guardar() {

    const datos = {

        agua: agua,

        sueno: sueno.value,

        desayuno: desayuno.checked,
        almuerzo: almuerzo.checked,
        merienda: merienda.checked,
        cena: cena.checked,

        ejercicio: ejercicio.value,
        minutos: minutos.value,

        pasos: pasos.value,
        kilometros: kilometros.value,

        peso: peso.value,

        animo: animo.value,

        notas: notas.value

    };

    localStorage.setItem(clave(), JSON.stringify(datos));

}

// ---------------------------
// Cargar
// ---------------------------

function cargar() {

    const datos = JSON.parse(localStorage.getItem(clave()));

    if (!datos) {

        agua = 0;
        pintarGotas();

        sueno.value = "";

        desayuno.checked = false;
        almuerzo.checked = false;
        merienda.checked = false;
        cena.checked = false;

        ejercicio.value = "";
        minutos.value = "";

        pasos.value = "";
        kilometros.value = "";

        peso.value = "";

        animo.value = "";

        notas.value = "";

        return;
    }

    agua = datos.agua || 0;

    pintarGotas();

    sueno.value = datos.sueno || "";

    desayuno.checked = datos.desayuno || false;
    almuerzo.checked = datos.almuerzo || false;
    merienda.checked = datos.merienda || false;
    cena.checked = datos.cena || false;

    ejercicio.value = datos.ejercicio || "";
    minutos.value = datos.minutos || "";

    pasos.value = datos.pasos || "";
    kilometros.value = datos.kilometros || "";

    peso.value = datos.peso || "";

    animo.value = datos.animo || "";

    notas.value = datos.notas || "";

}

// ---------------------------
// Gotas
// ---------------------------

function pintarGotas() {

    gotas.forEach((gota, index) => {

        if (index < agua) {
            gota.classList.add("activa");
        } else {
            gota.classList.remove("activa");
        }

    });

    litros.textContent = (agua * 0.5).toFixed(1) + " litros";

}

gotas.forEach((gota, index) => {

    gota.addEventListener("click", () => {

        agua = index + 1;

        pintarGotas();

        guardar();

    });

});

// ---------------------------
// Guardado automático
// ---------------------------

document.querySelectorAll("input, textarea, select").forEach(campo => {

    campo.addEventListener("input", guardar);

    campo.addEventListener("change", guardar);

});

// ---------------------------
// Cambio de fecha
// ---------------------------

fecha.addEventListener("change", cargar);

// ---------------------------
// Inicio
// ---------------------------

guardarBtn.addEventListener("click", () => {

    guardar();

    mensajeGuardado.textContent = "✅ Registro guardado";

    setTimeout(() => {

        mensajeGuardado.textContent = "";

    }, 2000);

});

cargar();

exportarBtn.addEventListener("click", () => {

    const datos = {};

    for (let i = 0; i < localStorage.length; i++) {

        const clave = localStorage.key(i);

        if (clave.startsWith("pasito_")) {

            datos[clave] = JSON.parse(localStorage.getItem(clave));

        }

    }

    const blob = new Blob(
        [JSON.stringify(datos, null, 2)],
        { type: "application/json" }
    );

    const enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(blob);

    enlace.download = "mis-registros-un-pasito.json";

    enlace.click();

});
