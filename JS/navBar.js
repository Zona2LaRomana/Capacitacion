const Nombre = sessionStorage.getItem("Nombre")
const Codigo = sessionStorage.getItem("Codigo")
const Oficial = sessionStorage.getItem("Oficial")

//Determinacion de Fecha del Sistema
const fechaSistema = new Date()
const fechaActual = fechaSistema.getFullYear() +"-"+ (fechaSistema.getMonth() + 1) +"-"+ fechaSistema.getDate()


if(Nombre){
    if(Oficial == "1"){ //Sin limite de Fecha para Oficiales
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
                            let evaluador, examen1, tarea1, display = "block"        
                            dataSeminario.forEach(fila => {                            
                            //Buscar los Resultados del modulo del estudiante
                                const urlTareas = "https://opensheet.elk.sh/1NlhcKqmAIVO1nAoYasLk8OoRLe7DUvvJ0V77Wlj4frc/Tareas"
                                fetch(urlTareas)
                                .then(asignacion => asignacion.json())
                                .then(calificacion => {
                                    const dataCalificacion = calificacion.find(dato => dato.Referencia === Codigo +"_"+fila.tareaArchivo)                                
                                    if(!dataCalificacion){
                                        examen1 = "0"
                                        tarea1 = "0"
                                        evaluador = "N/A"
                                        display = "block"
                                    }else{
                                        examen1 = dataCalificacion.Examen
                                        tarea1 = dataCalificacion.Tarea
                                        evaluador = dataCalificacion.Evaluador
                                        display = "none"
                                    }
                                    
                                    const div = document.createElement("div")
                                    div.innerHTML = `<div class="card-seminarios" name="${row.Codigo}">
                                                         <div class="card">
                                                             <img src="IMG/Icons/${fila.logoCapacitacion}">
                                                             <div class="card-content">
                                                                 <h3>${fila.tituloSeminario}</h3>
                                                                 <p>Calificaciones</p>
                                                                 <div class="per">
                                                                     <table>
                                                                         <tr>
                                                                             <td><span>${examen1} %</span></td>
                                                                             <!--<td><span>${tarea1} %</span></td>-->
                                                                         </tr>
                                                                         <tr>
                                                                             <td>Examen</td>
                                                                             <!--<td>Tarea</td>-->
                                                                         </tr>
                                                                     </table>
                                                                     <!--<p>Evaluador: ${evaluador}</p>-->
                                                                 </div>
                                                                 <button onclick="activarSeminario('${fila.codigoSeminario}', 'v-${fila.codigoSeminario}')">Ver Seminario</button>
                                                             </div>
                                                             <div class="taller" id="${fila.codigoSeminario}">
                                                                 <div class="content-taller">
                                                                     <h3>${fila.tituloSeminario}</h3>
                                                                     <iframe id="v-${fila.codigoSeminario}" width="100%" height="300" src="${fila.frameYoutube}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                                                     <p>${fila.descripcionYoutube}</p>
                                                                     <div class="asignaciones">
                                                                         <div class="asignacion">
                                                                            <h5>Realiza el Examen</h5>
                                                                            <a href="${fila.linkExamen}" target="_blank" rel="noopener noreferrer">
                                                                                Examen de la Asignación
                                                                            </a>
                                                                     </div>
                                                                     <!--<div class="asignacion">
                                                                        <h5>Realiza la Tarea</h5>
                                                                        <a href="${fila.linkTarea}" target="_blank" rel="noopener noreferrer">
                                                                            Decarga la Tarea
                                                                        </a>
                                                                        <input type="file" id="${fila.tareaArchivo}" style="display: ${display}" accept="application/pdf">
                                                                        <p id="${fila.respuestaArchivo}"></p>
                                                                        <button onclick="subirArchivo('${fila.tareaArchivo}', '${Codigo}', '${fila.respuestaArchivo}')">
                                                                            Entregar Tarea
                                                                        </button>
                                                                     </div>-->
                                                                 </div>
                                                                 <button onclick="desactivarSeminario('${fila.codigoSeminario}')">Cerrar</button>
                                                             </div>
                                                         </div>
                                                     </div>`
                                    taller.appendChild(div)
                               })
                                //Buscar los Resultados del Modulo del estudiante
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
    }else{//Con limitante de Fecha para los Aspirantes que no son Oficiales
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
                            let evaluador, examen1, tarea1, display = "block"        
                            dataSeminario.forEach(fila => {
                                const fec1 = new Date(fila.publicar)
                                const fec2 = new Date(fechaActual)
                                let estado = ""
                                if(fila.Finalizar == "1"){
                                    estado = "hidden"
                                    console.log(estado)
                                }
                                if(fec1.getTime() <= fec2.getTime()){
                                    //Buscar los Resultados del modulo del estudiante
                                const urlTareas = "https://opensheet.elk.sh/1NlhcKqmAIVO1nAoYasLk8OoRLe7DUvvJ0V77Wlj4frc/Tareas"
                                fetch(urlTareas)
                                .then(asignacion => asignacion.json())
                                .then(calificacion => {
                                    const dataCalificacion = calificacion.find(dato => dato.Referencia === Codigo +"_"+fila.tareaArchivo)                                
                                    if(!dataCalificacion){
                                        examen1 = "0"
                                        tarea1 = "0"
                                        evaluador = "N/A"
                                        display = "block"
                                    }else{
                                        examen1 = dataCalificacion.Examen
                                        tarea1 = dataCalificacion.Tarea
                                        evaluador = dataCalificacion.Evaluador
                                        display = "none"
                                    }
                                    
                                    const div = document.createElement("div")
                                    div.innerHTML = `<div class="card-seminarios" name="${row.Codigo}">
                                                         <div class="card">
                                                             <img src="IMG/Icons/${fila.logoCapacitacion}">
                                                             <div class="card-content">
                                                                 <h3>${fila.tituloSeminario}</h3>
                                                                 <p>Calificaciones</p>
                                                                 <div class="per">
                                                                     <table>
                                                                         <tr>
                                                                             <td><span>${examen1} %</span></td>
                                                                             <td><span>${tarea1} %</span></td>
                                                                         </tr>
                                                                         <tr>
                                                                             <td>Examen</td>
                                                                             <td>Tarea</td>
                                                                         </tr>
                                                                     </table>
                                                                     <p>Evaluador: ${evaluador}</p>
                                                                 </div>
                                                                 <button onclick="activarSeminario('${fila.codigoSeminario}', 'v-${fila.codigoSeminario}')">Ver Seminario</button>
                                                             </div>
                                                             <div class="taller" id="${fila.codigoSeminario}">
                                                                 <div class="content-taller">
                                                                     <h3>${fila.tituloSeminario}</h3>
                                                                     <iframe style="visibility:${estado}" id="v-${fila.codigoSeminario}" width="100%" height="300" src="${fila.frameYoutube}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                                                     <p>${fila.descripcionYoutube}</p>
                                                                     <div class="asignaciones">
                                                                         <div class="asignacion">
                                                                            <h5>Realiza el Examen</h5>
                                                                            <a href="${fila.linkExamen}" target="_blank" rel="noopener noreferrer">
                                                                                Examen de la Asignación
                                                                            </a>
                                                                     </div>
                                                                     <div class="asignacion">
                                                                        <h5>Realiza la Tarea</h5>
                                                                        <a href="${fila.linkTarea}" target="_blank" rel="noopener noreferrer">
                                                                            Decarga la Tarea
                                                                        </a>
                                                                        <input type="file" id="${fila.tareaArchivo}" style="display: ${display}" accept="application/pdf">
                                                                        <p id="${fila.respuestaArchivo}"></p>
                                                                        <button onclick="subirArchivo('${fila.tareaArchivo}', '${Codigo}', '${fila.respuestaArchivo}')">
                                                                            Entregar Tarea
                                                                        </button>
                                                                     </div>
                                                                 </div>
                                                                 <button onclick="desactivarSeminario('${fila.codigoSeminario}')">Cerrar</button>
                                                             </div>
                                                         </div>
                                                     </div>`
                                    taller.appendChild(div)
                               })
                                //Buscar los Resultados del Modulo del estudiante                                    
                                }
                                
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
    }
}else{
    window.location.href = "login.html"
}