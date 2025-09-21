let nombre;
let edad;
const costoBase = 5000;
const doctores = ["Cian Cecilia", "Mansor Eduardo", "Mansor Emilio"];

function pedirDatos() {
    nombre = prompt("Ingrese su nombre y apellido");
    edad = parseInt(prompt("Ingrese su edad"));
    if (edad < 18) {
        alert("Bienvenido/a, " + nombre + ", de " + edad + " años, deberá asistir acompañado de un adulto a su consulta.")
    }else alert(`Bienvenido/a, ${nombre}, de ${edad} años`);
}



function elegirDoctor(listaDoctores) {
    let doctorSeleccionado;

    while(!doctorSeleccionado){
    let opcion = parseInt(prompt("Ingrese con quién quiere ser atendido:\n 1: " + listaDoctores[0] + "\n 2: " + listaDoctores[1] + "\n 3: " + listaDoctores[2] ));

    switch (opcion) {
        case 1:
            doctorSeleccionado = listaDoctores[0];
            break;
        case 2:
            doctorSeleccionado = listaDoctores[1];
            break;
        case 3:
            doctorSeleccionado = doctores[2];
            break;

        default:
            alert("Debe seleccionar uno de los números indicados");
                } 
    }
    return doctorSeleccionado;
}


const tratamientos = ["control", "caries", "ortodoncia", "emergencia"];

function elegirTratamiento(listaTratamientos) {
    let tratamientoSeleccionado;

    while (!tratamientoSeleccionado) {
        let opcion = parseInt(prompt("¿Cuál es el motivo de su consulta?\n 1: " + listaTratamientos[0] + "\n 2: " + listaTratamientos[1] + "\n 3: " + listaTratamientos[2] + "\n 4: " + listaTratamientos[3]));

        switch (opcion) {
            case 1:
                tratamientoSeleccionado = tratamientos[0];
                break;
            case 2:
                tratamientoSeleccionado = tratamientos[1];
                break;
            case 3:
                tratamientoSeleccionado = tratamientos[2];
                break;
            case 4:
                tratamientoSeleccionado = tratamientos[3];
                break;

            default:
                alert("Debe seleccionar uno de los números indicados");
        }
    }
        return tratamientoSeleccionado;
}



pedirDatos(costoBase);
let doctorFinal = elegirDoctor(doctores);
let tratamientoFinal = elegirTratamiento(tratamientos);

alert("Resumen de su turno:  \nPaciente: " + nombre + "\nEdad: " + edad + " años" + "\nDoctor elegido: " + doctorFinal + "\nTratamiento: " + tratamientoFinal + "\nCosto base: $" + costoBase);

console.log("Paciente: " + nombre);
if (edad < 18) {
    console.log("Edad: " + edad + ", debe asistir con un mayor de edad");
}else {
    console.log("Edad: " + edad);
}

console.log("Doctor: " + doctorFinal );
console.log("Tratamiento: " + tratamientoFinal);
console.log("Costo base: " + costoBase);