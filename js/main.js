
const doctores = [
    {
        nombre: "Cian Cecilia",
        id:1,
        tratamientos: ["control", " ortodoncia"],
    },
    {
        nombre: "Mansor Eduardo",
        id:2,
        tratamientos: ["control", " caries"],
    },
    {
        nombre: "Mansor Emilio",
        id:3,
        tratamientos: ["control", " emergencias"],
    },
];

let cardsDoctores = document.getElementById("cardsDoctores");

function renderOdontologos(lista) {
    lista.forEach((doctor) => {
        let card = document.createElement("div");
        card.innerHTML = `
    <h3>Doctor: ${doctor.nombre}</h3>
    <p>Tratamientos: ${doctor.tratamientos}</p>
    <a id="${doctor.id}" href="../pages/formulario.html" class="btnReservar">Reservar Turno</a>`;

        cardsDoctores.appendChild(card);
    })
    reservarButton();
};

function reservarButton() {
    let addButton = document.querySelectorAll(".btnReservar")
    addButton.forEach(link => {
        link.onclick = () => {
            const odontologoId = Number(link.id)
            const odontologoElegido = doctores.find((doctor) => doctor.id == odontologoId)

            localStorage.setItem("odontologoSeleccionado", JSON.stringify(odontologoElegido))
        }
    })
}

renderOdontologos(doctores);
