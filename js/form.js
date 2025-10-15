// Formulario

const odontologos = JSON.parse(localStorage.getItem("odontologoSeleccionado")) || [];
const ultimoOdontologo = odontologos[odontologos.length - 1];
const tituloDoctor = document.getElementById("tituloDoctor");

tituloDoctor.textContent = `Reservar turno con ${ultimoOdontologo.nombre}`;

const form = document.getElementById("formTurno");
const nombre = document.getElementById("nombre");
const edad = document.getElementById("edad");
const fecha = document.getElementById("fecha");
const hora = document.getElementById("hora");
const mensaje = document.getElementById("mensaje");

const botonEliminar = document.createElement("button");
botonEliminar.textContent = "Eliminar turno";
botonEliminar.type = "button";
document.body.appendChild(botonEliminar);

form.onsubmit = () => {
    const turno = {
        odontologo: ultimoOdontologo.nombre,
        nombrePaciente: nombre.value,
        edad: edad.value,
        fecha: fecha.value,
        hora: hora.value,
    };

    localStorage.setItem("turnoConfirmado", JSON.stringify(turno));

    mensaje.textContent = `Próximo turno: ${turnoGuardado.odontologo} — Paciente: ${turnoGuardado.nombrePaciente} — ${turnoGuardado.fecha} a las ${turnoGuardado.hora}`;

};


const turnoGuardado = JSON.parse(localStorage.getItem("turnoConfirmado"));
if (turnoGuardado) {
    let texto =
        `Próximo turno: ${turnoGuardado.odontologo} — Paciente: ${turnoGuardado.nombrePaciente} — ${turnoGuardado.fecha} a las ${turnoGuardado.hora}`;
    if (turnoGuardado.edad < 18) {
        texto += ` — ${turnoGuardado.nombrePaciente} debe asistir con un adulto responsable.`;
    }
    mensaje.textContent = texto;
}

botonEliminar.onclick = () => {
    localStorage.removeItem("turnoConfirmado");
    mensaje.textContent = "No hay turnos guardados";
};