async function evaluacionRegistro(examen_, tarea_, evaluador_, referencia_, participante_){

    console.log(examen_, tarea_, evaluador_, referencia_, participante_)

    const ahora = new Date();
    const fecha_ = `${ahora.getFullYear()}-${String(ahora.getMonth()+1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')} ` +
    `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}:${String(ahora.getSeconds()).padStart(2, '0')}`;

    const evaluacion = {
        examen: examen_,
        tarea: tarea_,
        evaluador: evaluador_,
        fecha: fecha_,
        referencia: referencia_
    }

    const res = await fetch("https://script.google.com/macros/s/AKfycbxnQFYKgDJeevXMw7fogrvpowyWwa7rHDuAndBhm1HPnYV7LfgFRb-xJ3u63pVgWLmH/exec",{
        method: "POST",
        body: JSON.stringify(evaluacion),
        headers: {"Content-Type": "application/json"}
    })

    const data = await res.json()
    Swal.fire({
        title: "Evaluación Registrada",
        text: "Se ha registrado la evaluación de " + participante_,
        icon: "success"
    })
}