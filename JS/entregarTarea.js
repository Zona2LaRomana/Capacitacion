const clouName = 'dv0gvojyg'
const uploadPreset = 'public_upload'

async function subirArchivo(fileInput, codigoUsuario, result){
    const archivo = document.getElementById(fileInput).files[0]
    const resultado = document.getElementById(result)

    if(!archivo){
        Swal.fire({
            title: "No ha suministrado el archivo",
            text: "Por Favor, seleccione el archivo de su asignación en formato PDF.",
            icon: "info"
        })
        return
    }

    const fecha = new Date()

    const reg = fecha.getFullYear() + (fecha.getMonth() + 1).toString().padStart(2, '0') + "_" + fecha.getHours() + "|" + fecha.getMinutes()

    const nombrePublico = fileInput + "_" + codigoUsuario + "_" + fecha.getFullYear() + (fecha.getMonth() + 1).toString().padStart(2, '0') + "_" + 
    fecha.getHours() + "|" + fecha.getMinutes()

    const url = `https://api.cloudinary.com/v1_1/${clouName}/raw/upload`
    
    const formData = new FormData()
    formData.append('file', archivo)
    formData.append('upload_preset', uploadPreset)
    formData.append('public_id', nombrePublico)

    resultado.textContent = "⏳ Subiendo tarea..."

    try{
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        })

        const data = await response.json()

        if(data.secure_url){
            RegistrarTarea(codigoUsuario, fileInput, reg, data.secure_url)
            Swal.fire({
                title: "¡Bien Hecho!",
                text: "Se ha realizado la Entrega de su Asignación",
                icon: "success"
            })
        }else{
            Swal.fire({
                title: "A Ocurrido un Problema",
                text: "❌ Error:\n" + JSON.stringify(data, null, 2),
                icon: "error"
            })
        }
    }catch(error){
        Swal.fire({
            title: "A Ocurrido un Error",
            text: "❌ Error de red:\n" + error.message,
            icon: "error"
            })
    }
}

async function RegistrarTarea(usuario, codigo, fecha, link){

    const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbzj9c2V27ViFSMBczSVOqFoGkbMnScIXTceUexVFMpw38wf1Ew9sT6UZH9xMPW78yxWog/exec"

    const data = new URLSearchParams()

    data.append("usuario", usuario)
    data.append("codigo", codigo)
    data.append("fecha", fecha)
    data.append("linkTarea", link)
    data.append("examen", 0)
    data.append("tarea", 0)
    data.append("evaluador", "N/A")
    data.append("fechaEvaluacion", Date.now().toString())
    data.append("referencia", usuario + "_" + codigo)

    try{
        const response = await fetch(URL_SCRIPT, {
            method: "POST",
            body: data
        })

        const result = await response.text()

        console.log("Registro exitoso ✔️")
        resultado.textContent = "Tarea Entregada con exito ✔️"
        window.location.reload()
    }catch(error){
        console.log("Error al registrar ❌")
        resultado.textContent = "Error en el Envio ❌. Intente más tarde"
        console.error(error)
    }
}