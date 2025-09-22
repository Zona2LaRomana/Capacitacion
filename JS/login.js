const SHEET_URL = "https://opensheet.elk.sh/1NlhcKqmAIVO1nAoYasLk8OoRLe7DUvvJ0V77Wlj4frc/Usuarios"

document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const correo = document.getElementById("txtUser").value.trim()
    const passwr = document.getElementById("txtPass").value.trim()
    

    //Convertir la contraseña para encriptarla a SHA-256
    const encoder = new TextEncoder()
    const data = encoder.encode(passwr)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const passwordHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    fetch(SHEET_URL)
    .then(res => res.json())
    .then(data => {
        const user = data.find(u => u.Correo === correo)
        console.log(user)
        if(!user){
            document.getElementById("mensaje").textContent = "Correo No Encontrado."
            return
        }

        if(user.PasswordHash === passwr){
            //Enviar al Dashboard con los datos
            //const query = new URLSearchParams(user).toString()
            //window.location.href = "dashboard.html?" + query
            sessionStorage.setItem("Codigo", user.Codigo)
            sessionStorage.setItem("Nombre", user.Nombre)
            sessionStorage.setItem("Oficial", user.Coordinador)
            window.location.href = "dashboard.html"
        }else{
            document.getElementById("mensaje").textContent = "Contraseña Incorrecta"
        }
    }).catch(err => {
        console.error("Error: ", err)
        document.getElementById("mensaje").textContent = "No se pudo establecer la conexión"
    })
})