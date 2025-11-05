let doctores = [];
let cardsDoctores = document.getElementById("cardsDoctores");

async function cargarDoctores() {
    try {
        const respuesta = await fetch("./data/odontologos.json");
        if (!respuesta.ok) throw new Error("Error al cargar los datos");
        doctores = await respuesta.json();
        renderOdontologos(doctores);
    } catch (error) {
        console.error("Hubo un problema al traer los doctores:", error);
    } finally {
        console.log("Carga de odontólogos finalizada.");
    }
}

function renderOdontologos(doctores) {
    doctores.forEach((doctor) => {
        let card = document.createElement("div");
        card.innerHTML = `
    <h3>Doctor: ${doctor.nombre}</h3>
    <p>Tratamientos: ${doctor.tratamientos}</p>
    <a id="${doctor.id}" href="../pages/formulario.html" class="btnReservar">Reservar Turno</a>`;

        cardsDoctores.appendChild(card);
    });
    reservarButton();
}

function reservarButton() {
    let addButton = document.querySelectorAll(".btnReservar");
    addButton.forEach((link) => {
        link.onclick = () => {
            const odontologoId = Number(link.id);
            const odontologoElegido = doctores.find(
                (doctor) => doctor.id == odontologoId
            );

            localStorage.setItem(
                "odontologoSeleccionado",
                JSON.stringify(odontologoElegido)
            );
        };
    });
}

cargarDoctores()
renderOdontologos(doctores);
