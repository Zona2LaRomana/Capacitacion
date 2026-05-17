const sb = window.supabase.createClient(
    "https://onfccgeapychxhlrstex.supabase.co",
    "sb_publishable_iIE-olKlfIqdPwmi0HJsTQ_33VbluMY"
)

async function registro(){

    const ahora = new Date()
    const nombre = document.getElementById("txtNombreApellido").value
    const correo = document.getElementById("txtCorreo").value
    const password = document.getElementById("txtTelefono").value
    const telefono = document.getElementById("txtTelefono").value
    const zona = document.getElementById("txtZona").value
    const distrito = document.getElementById("txtDistrito").value
    const tipo_user = document.getElementById("ddlTipoParticipante").value
    const Bas_Ave = document.getElementById("ba_AV").checked ? 1 : 0
    const Bas_Pat = document.getElementById("ba_PA").checked ? 1 : 0
    const Dir_Ave = document.getElementById("di_AV").checked ? 1 : 0
    const Dir_Pat = document.getElementById("di_PA").checked ? 1 : 0
    const Con_Pat = document.getElementById("co_PA").checked ? 1 : 0
    const Cer_Prev = document.getElementById("ddlPrevias").value
    const cuales = document.getElementById("txtCertificacionesPrevias").value
    const status = 0
    const reg = "Registro: " + ahora.toString()

    const {count} = await sb.from("tbusuarios").select("*", {count: "exact", head: true})

    let codigo = "Z" + zona + "-" + String(count+1).padStart(3,'0')

    const {data, error} = await sb.from("tbusuarios").insert([
        {
            us_cod: codigo,
            us_nom: nombre,
            us_mai: correo,
            us_pwd: telefono,
            us_tel: telefono,
            us_zon: zona,
            us_dis: distrito,
            us_tip: tipo_user,
            us_cer_pre: Cer_Prev,
            us_cer_cua: cuales,
            us_sta: status,
            us_reg_act: reg,
            us_bas_ave: Bas_Ave,
            us_bas_pat: Bas_Pat,
            us_dir_ave: Dir_Ave,
            us_dir_pat: Dir_Pat,
            us_con_pat: Con_Pat
        }
    ])

    if(error){
        console.log("Error: " + error.message)
        return false
    }else{
        console.log("Usuario Registrado Correctamente")
        return true
    }
}

async function procesoRegistro(){
    const result = await Swal.fire({
    title: "¿Desea completar el proceso de registro?",
    showDenyButton: true,
    icon: "warning",
    confirmButtonText: "Registrar",
    denyButtonText: `No Registrar`
    })

    if (result.isConfirmed){
        const respuesta = await registro()
        if(respuesta === true){
            Swal.fire("Usuario Registrado Correctamente", "", "success");
            const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
            await wait(3000)
            window.location.href = "index.html"
        }else{
            Swal.fire("Ocurrio un Error, intentelo más tarde.", "Asegurese de haber dado todas las informaciones", "error");
        }
    } else if (result.isDenied) {
        Swal.fire("No se ha registrado el Usuario", "", "info");
    }
}