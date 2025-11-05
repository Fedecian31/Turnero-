let doctores = [];
let cardsDoctores = document.getElementById("cardsDoctores");
// const URL = "./db/data.json";

function cargarDoctores() {
    fetch("./db/data.json")
        .then((respuesta) => respuesta.json())
        .then((data) => {
            doctores = data;
            renderOdontologos(doctores);
        })
        .catch((error) => {
            console.error("Hubo un problema al traer los doctores:", error);
        })
        .finally(() => {
            console.log("Carga de odontólogos finalizada.");
        });
}

function renderOdontologos(doctores) {
    cardsDoctores.innerHTML = "";

    doctores.forEach((doctor) => {
        let card = document.createElement("div");
        card.innerHTML = `
        <h3>Doctor: ${doctor.nombre}</h3>
        <p>Tratamientos: ${doctor.tratamientos.join(", ")}</p>
        <a id="${doctor.id}" href="./pages/formulario.html" class="btnReservar">Reservar Turno</a>
    `;
        cardsDoctores.appendChild(card);
    });

    reservarButton();
}

function reservarButton() {
    const botones = document.querySelectorAll(".btnReservar");

    botones.forEach((link) => {
        link.onclick = () => {
            const odontologoId = Number(link.id);
            const odontologoElegido = doctores.find((d) => d.id === odontologoId);

            localStorage.setItem(
                "odontologoSeleccionado",
                JSON.stringify(odontologoElegido)
            );
        };
    });
}

cargarDoctores();
