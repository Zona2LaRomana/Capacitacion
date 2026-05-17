let z = Codigo.slice(0,2)
z = z.slice(-1)
if(Oficial == "0"){
    const tabla = document.getElementById("tParticipantes")
    obtener_participantes(z).then(dato =>{
        if(dato.lenght === 0){
            const tr = document.createElement("tr")
            tr.innerHTML = `<td colspan='10'>No hay datos disponibles</td>`
        }else{
            dato.forEach(candidato => {
                let check = false
                if(candidato.estado == "1"){
                    check = true
                }else{
                    check = false
                }
                const tr = document.createElement("tr")
                tr.innerHTML = `<td>${candidato.codigo}</td>
                                <td>${candidato.participante}</td>
                                <td>${candidato.telefono}</td>
                                <td>${candidato.distrito}</td>
                                <td>${candidato.bas_ave}</td>
                                <td>${candidato.bas_pat}</td>
                                <td>${candidato.dir_ave}</td>
                                <td>${candidato.dir_pat}</td>
                                <td>${candidato.con_pat}</td>
                                <td>
                                    <div class="group">
                                        <input type="checkbox" name="certificaciones" id="${candidato.codigo}" ${check ? "checked" : ""}>
                                        <label for="${candidato.codigo}" class="label"></label>
                                    </div>
                                </td>`
                tabla.appendChild(tr)
            })
        }
    })
    
}

async function obtener_participantes(zonaCod){
    const {data, error} = await sb.rpc("sp_participantes_activacion", {
        zona: parseInt(zonaCod)
    })
    return data
}

async function activar_usuario(usuario, responsable, estado) {
    const {data, error} = await sb.rpc("sb_activar_usuario", {
        usuario: usuario,
        responsable: responsable,
        estado: estado
    })
    return error
}

document.body.addEventListener("change", function (e){
    if(e.target.type === "checkbox"){
        let estado
        if(e.target.checked == true){
            estado = "Usuario activado por " + Nombre
        }else{
            estado = "Usuario desactivado por " + Nombre
        }
       
        activar_usuario(e.target.id, estado, e.target.checked ? 1:0).then(dato =>{
            if(dato === 0){
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Ha ocurrido un error",
                    showConfirmButton: false,
                    timer: 2000
                });
            }else{
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Usuario actualizado",
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        })
    }
})