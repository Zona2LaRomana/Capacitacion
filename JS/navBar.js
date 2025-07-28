const Nombre = sessionStorage.getItem("Nombre")
const Codigo = sessionStorage.getItem("Codigo")
if(Nombre){
    document.getElementById("user").innerHTML = Nombre
    
    const hojaURL = "https://opensheet.elk.sh/1NlhcKqmAIVO1nAoYasLk8OoRLe7DUvvJ0V77Wlj4frc/Certificados"

    fetch(hojaURL)
    .then(res => res.json())
    .then(data => {
        const registro = data.filter(row => row.Usuario === Codigo)

        const lista = document.getElementById("listaNav")
        const taller = document.getElementById("section")

        if(registro.length === 0){
            lista.innerHTML = "<li>No hay datos disponibles</li>"
        }else{
            registro.forEach(row => {
                const li = document.createElement("li")
                li.innerHTML = `<a href="#" onclick="${row.CodeJS}">
                                <img src="IMG/Icons/${row.Imagen}" class="icon">
                                <label for="" class="nav-item">${row.Nombre}</label>
                                </a>`
                lista.appendChild(li)
                //Cargar los seminarios Suministraddos
                const hojaURLSeminarios = "https://opensheet.elk.sh/1NlhcKqmAIVO1nAoYasLk8OoRLe7DUvvJ0V77Wlj4frc/Seminarios"

                fetch(hojaURLSeminarios)
                .then(sem => sem.json())
                .then(seminario => {
                    const dataSeminario = seminario.filter(fila => fila.CodigoCapacitacion === row.Codigo)                    
                    if(dataSeminario.length === 0){
                        //taller.innerHTML = "<div>No hay datos disponibles</div>"
                    }else{                        
                        dataSeminario.forEach(fila => {
                            const div = document.createElement("div")
                            div.innerHTML = `<div class="card-seminarios" name="${row.Codigo}">
                                             <div class="card">
                                             <img src="IMG/Icons/${fila.logoCapacitacion}">
                                             <div class="card-content">
                                             <h3>${fila.tituloSeminario}</h3>
                                             <p>${fila.descripcionYoutube}</p>
                                             <button onclick="activarSeminario('${fila.codigoSeminario}', 'v-${fila.codigoSeminario}')">Ver Seminario</button>
                                             </div>
                                             <div class="taller" id="${fila.codigoSeminario}">
                                             <div class="content-taller">
                                             <h3>${fila.tituloSeminario}</h3>
                                             <iframe id="v-${fila.codigoSeminario}" width="90%" height="300" src="${fila.frameYoutube}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                             <p>${fila.descripcionYoutube}</p>
                                             <div class="asignaciones">
                                             <div class="asignacion">
                                             <h5>Realiza el Examen</h5>
                                             <a href="${fila.linkExamen}" target="_blank" rel="noopener noreferrer">Examen de la Asignación</a>
                                             </div>
                                             <div class="asignacion">
                                             <h5>Realiza la Tarea</h5>
                                             <a href="${fila.linkTarea}" target="_blank" rel="noopener noreferrer">Decarga la Tarea</a>
                                             <input type="file" id="${fila.tareaArchivo}" accept="application/pdf">
                                             <button onclick="subirArchivo('${fila.tareaArchivo}', '${Codigo}')">Entregar Tarea</button>
                                             </div>
                                             </div>
                                             <button onclick="desactivarSeminario('${fila.codigoSeminario}')">Cerrar</button>
                                             </div>
                                             </div>
                                             </div>`
                            taller.appendChild(div)
                        })
                    }
                })
                //Hasta aqui la carga de Seminarios
            })
        }
    }).catch(error => {
        console.error("Error al Cargar datos: ", error)
        const lista = document.getElementById("listaNav")
        lista.innerHTML = "<li>Error al Conectar los datos.</li>"
    })
}else{
    window.location.href = "login.html"
}
