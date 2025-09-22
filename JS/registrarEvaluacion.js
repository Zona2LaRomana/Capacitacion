async function evaluacionRegistro(examen_, tarea_, evaluador_, referencia_, participante_){

    const valorExamen = document.getElementById(examen_).value
    const valorTarea = document.getElementById(tarea_).value

    const ahora = new Date();
    const fecha_ = `${ahora.getFullYear()}-${String(ahora.getMonth()+1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')} ` +
    `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}:${String(ahora.getSeconds()).padStart(2, '0')}`;

    fetch("https://script.google.com/macros/s/AKfycbzpUGBXqmv4Q5KHD3k6XYraFlCr0pajNIAAuReOEDdXQAqvZGZ0IR-y3emyVsyMujtw/exec", {
        method: "POST",
        body: new URLSearchParams({
            examen: valorExamen,
            tarea: valorTarea,
            evaluador: evaluador_,
            fecha: fecha_,
            referencia: referencia_
        })
    })
    .then(res => res.json())
    .then(data => Aceptado(participante_))
    .catch(err => Denegado(err))
}

function Aceptado(participante){
    Swal.fire({
        title: "Evaluación Registrado",
        text: "Se ha registrado la Evaluación de " + participante,
        icon: "success"
    })
}

function Denegado(error){
    Swal.fire({
        title: "Se ha detectado un Error",
        text: error,
        icon: "error"
    })
}