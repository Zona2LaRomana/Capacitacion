const sb = window.supabase.createClient(
    "https://onfccgeapychxhlrstex.supabase.co",
    "sb_publishable_iIE-olKlfIqdPwmi0HJsTQ_33VbluMY"
)

document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const correo = document.getElementById("txtUser").value.trim()
    const passwr = document.getElementById("txtPass").value.trim()
    
    const {data, error} = await sb.rpc("sp_login_usuario",{
        p_ema: correo,
        p_pwd: passwr
    })

    if(error){
        document.getElementById("mensaje").textContent = "Error en la consulta"
        return
    }

    if(!data || data.length === 0){
        document.getElementById("mensaje").textContent = "El Usuario y/o la contraseña son incorrectos"
        return
    }else{
        const user = data[0]
        if(user.status == "0"){
                Swal.fire("Su usuario aun no esta activo", "Por favor comuniquese con su coordinador local", "info");
        }else{
            sessionStorage.setItem("Codigo", user.codigo)
            sessionStorage.setItem("Nombre", user.nombre)
            sessionStorage.setItem("Oficial", user.tipo)
            sessionStorage.setItem("passwr", user.reem)
            window.location.href = "dashboard.html"
        }
    }
})