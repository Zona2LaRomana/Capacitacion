let datosExcel = []
let registroParticipantes = document.getElementById("tablaUsuarios")
let totalRegistros = document.getElementById("totalDeRegistros")
const botonRegistro = document.getElementById("regUsuarios")

function leerExcel(){
    let archivo = document.getElementById("archivoExcel").files[0]

    if(!archivo){
        alert("Selecciona un archivo Excel")
        return
    }

    let lector = new FileReader();
    lector.onload = function(e){
        let data = new Uint8Array(e.target.result)

        let libro = XLSX.read(data, {type:'array'})

        let hoja = libro.Sheets[libro.SheetNames[0]]

        datosExcel = XLSX.utils.sheet_to_json(hoja)

        mostrarTabla()
    }
    lector.readAsArrayBuffer(archivo)
}

function mostrarTabla(){
    if (datosExcel.length === 0){
        return
    }

    let html = "<table id='tablaExcel'>"

    html += "<tr>"

    Object.keys(datosExcel[0]).forEach(column => {
        html += `<th>${column}</th>`
    })
    html += "</tr>"
    datosExcel.forEach(fila => {
        html += "<tr>"
        Object.values(fila).forEach(valor => {
            html += `<td>${valor}</td>`
        })
        html += "</tr>"
    })
    html += "</table>"
    registroParticipantes.innerHTML = html
    totalRegistros.innerHTML = "Total de Registros: " + datosExcel.length
    botonRegistro.style.display = "block"
}

async function procesarDatosTabla(){
    let proceso = ""
    let cantidad = 0
    datosExcel.forEach(index =>{
        let correo = index.Correo
        let nombre = index.Participante
        let zona = index.Zona
        let distrito = index.Distrito
        let cargo = index.Cargo
        let telefono = index.Telefono
        let ba_ave = index.Bas_Ave ? 1 : 0
        let ba_pat = index.Bas_Pat ? 1 : 0
        let di_ave = index.Dir_Ave ? 1 : 0
        let di_pat = index.Dir_Pat ? 1 : 0
        let co_pat = index.Con_Pat ? 1 : 0

        const respuesta = registrarData(nombre, correo, telefono, zona, distrito, cargo, 0, "N/A", 
            ba_ave, ba_pat, di_ave, di_pat, co_pat)
        if(!respuesta){
            proceso += "Error en el registro de: " + nombre + "\n"
        }else{
            cantidad++
        }
        Swal.fire({
            title: "Listo",
            text: "Se han registrado " + cantidad + " nuevos usuarios.",
            icon: "success"
        });
    })
}
async function registrarData(nombre, correo, telefono, zona, distrito, tipo, previa, cuales, 
    basAve, basPat, dirAve, dirPAt, conPat) {
    const {data, error} = await sb.rpc("registrar_usuario", {
        p_nombre: nombre,
        p_correo: correo,
        p_telefono: telefono,
        p_zona: zona,
        p_distrito: distrito,
        p_tipo: tipo,
        p_previa: previa,
        p_cuales: cuales,
        p_basica_ave: basAve,
        p_basica_pat: basPat,
        p_director_ave: dirAve,
        p_director_pat: dirPAt,
        p_consejero_pat: conPat
    })

    await new Promise(resolve => setTimeout(resolve, 2000))

    if(error){
        console.log(error)
        return false
    }else{
        return true
    }
}