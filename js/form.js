// Formulario

const odontologo = JSON.parse(localStorage.getItem("odontologoSeleccionado"));
const tituloDoctor = document.getElementById("tituloDoctor");
if (odontologo && odontologo.nombre) {
    tituloDoctor.textContent = "Reservar turno con " + odontologo.nombre;
} else {
    tituloDoctor.textContent = "Reservar turno";
}

const form = document.getElementById("formTurno");
const nombre = document.getElementById("nombre");
const edad = document.getElementById("edad");
const fecha = document.getElementById("fecha");
const hora = document.getElementById("hora");
const btnGuardar = document.getElementById("btnGuardar");
const mensaje = document.getElementById("mensaje");
const lista = document.getElementById("listaTurnos");


var contadorId = Number(localStorage.getItem("contadorId")) || 1;

function leerTurnos() {
    var datos = localStorage.getItem("turnos");
    if (datos) {
        return JSON.parse(datos);
    } else {
        return [];
    }
}
function escribirTurnos(turnos) {
    localStorage.setItem("turnos", JSON.stringify(turnos));
}

// Crear turno
function crearTurno(data) {
    var turnos = leerTurnos();
    data.id = contadorId;
    turnos.push(data);
    escribirTurnos(turnos);

    contadorId = contadorId + 1;
    localStorage.setItem("contadorId", contadorId);
}

// Editar turno
function editarTurno(id, cambios) {
    var turnos = leerTurnos();
    for (var i = 0; i < turnos.length; i++) {
        if (turnos[i].id === id) {
            cambios.id = id;
            turnos[i] = cambios;
            break;
        }
    }
    escribirTurnos(turnos);
}

// Eliminar turno
function eliminarTurno(id) {
    var turnos = leerTurnos();
    var nuevosTurnos = [];
    for (var i = 0; i < turnos.length; i++) {
        if (turnos[i].id !== id) {
            nuevosTurnos.push(turnos[i]);
        }
    }
    escribirTurnos(nuevosTurnos);
}


// Render de la lista

var turnoEnEdicionId = null;

function renderTurnos() {
    var turnos = leerTurnos();
    turnos.sort(function (a, b) { return b.id - a.id; });
    lista.innerHTML = "";

    for (var i = 0; i < turnos.length; i++) {
        var t = turnos[i];
        var div = document.createElement("div");
        div.className = "turno-card";
        div.innerHTML = `<strong>Paciente: ${t.nombrePaciente} (${t.edad})</strong><br>
                        Doctor: ${t.odontologo} — ${t.fecha} ${t.hora} <div class="acciones">
                        <button class="btn-editar" data-id="${t.id}">Editar</button>
                        <button class="btn-eliminar" data-id="${t.id}">Eliminar</button>
                        </div>`;
        lista.appendChild(div);
    }

    // Evento: eliminar

    var btnEliminar = document.getElementsByClassName("btn-eliminar");
    for (var i = 0; i < btnEliminar.length; i++) {
        btnEliminar[i].onclick = function () {
            var id = Number(this.getAttribute("data-id"));
            eliminarTurno(id);
            renderTurnos();
            mensaje.textContent = "Turno eliminado.";
        };
    }

    // Evento: editar

    var btnEditar = document.getElementsByClassName("btn-editar");

    for (var i = 0; i < btnEditar.length; i++) {
        btnEditar[i].onclick = function () {
            var id = Number(this.getAttribute("data-id"));
            var turnos = leerTurnos();

            var encontrado = null;
            for (var x = 0; x < turnos.length; x++) {
                if (turnos[x].id === id) {
                    encontrado = turnos[x];
                    break;
                }
            }
            if (!encontrado) return;

            nombre.value = encontrado.nombrePaciente;
            edad.value = encontrado.edad;
            fecha.value = encontrado.fecha;
            hora.value = encontrado.hora;

            turnoEnEdicionId = id;
            btnGuardar.textContent = "Guardar cambios";
            mensaje.textContent = "Editando turno…";
        };
    }
}



// Formulario
form.onsubmit = (e) => {
    e.preventDefault();

    const turno = {
        odontologo: odontologo.nombre,
        nombrePaciente: nombre.value,
        edad: Number(edad.value),
        fecha: fecha.value,
        hora: hora.value,
    };

    if (turnoEnEdicionId) {
        editarTurno(turnoEnEdicionId, turno);
        turnoEnEdicionId = null;
        btnGuardar.textContent = "Confirmar turno";
        mensaje.textContent = "Turno editado correctamente.";
    } else {
        crearTurno(turno);
        mensaje.textContent = "Turno creado correctamente.";
    }

    form.reset();
    renderTurnos();
};


// Vanilla Calendar

document.addEventListener("DOMContentLoaded", () => {
    const calendar = new VanillaCalendar("#fecha", {
        input: true,
        actions: {
            changeToInput(e, self) {
                if (!self.HTMLInputElement) return;
                const v = self.selectedDates?.[0] || "";
                self.HTMLInputElement.value = v;
                if (v) self.hide();
            },
        },
        settings: {
            iso8601: false,
            lang: "es",
            selection: {
                day: "single",
                time: false,
            },
            visibility: {
                positionToInput: "center",
                theme: 'light',
            },
            range: {
                min: "today",
                disableWeekday: [0, 6],
            },
        },
    });

    calendar.init();
    calendar.HTMLInputElement = fecha;
});

renderTurnos();
