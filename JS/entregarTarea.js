const clouName = 'dv0gvojyg'
const uploadPreset = 'public_upload'

async function subirArchivo(fileInput, codigoUsuario){
    const archivo = document.getElementById(fileInput).files[0]
    //const resultado = document.getElementById(result)

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

    //resultado.textContent = "⏳ Subiendo tarea..."

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

    const URL_SCRIPT = "https://script.google.com/macros/s/AKfycby46vLCFgVIcp8-c2wWrGnCB-7HIwr-iebmP5-UO3zFzjUNMlBEPMUZXITU7rfHRsfD/exec"

    const data = new URLSearchParams()

    data.append("usuario", usuario)
    data.append("codigo", codigo)
    data.append("fecha", fecha)
    data.append("linkTarea", link)

    try{
        const response = await fetch(URL_SCRIPT, {
            method: "POST",
            body: data
        })

        const result = await response.text()

        console.log("Registro exitoso ✔️")
    }catch(error){
        console.log("Error al registrar ❌")
        console.error(error)
    }
}