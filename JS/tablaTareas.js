const codigoUser = sessionStorage.getItem("Codigo")
const urlTarea = "https://opensheet.elk.sh/1NlhcKqmAIVO1nAoYasLk8OoRLe7DUvvJ0V77Wlj4frc/Tareas"

const tabla = document.getElementById("tTareas")

fetch(urlTarea)
.then(res => res.json())
.then(data => {
    const registro = data.forEach(tarea => {
        if(tarea.Usuario.substring(0,2) == codigoUser.substring(0,2)){
            const tr = document.createElement("tr")

            const urlUsuario = "https://opensheet.elk.sh/1NlhcKqmAIVO1nAoYasLk8OoRLe7DUvvJ0V77Wlj4frc/Usuarios"

            fetch(urlUsuario)
            .then(us => us.json())
            .then(user => {
                const Usuario = user.find(dUser => dUser.Codigo === tarea.Usuario)

                const urlSeminario = "https://opensheet.elk.sh/1NlhcKqmAIVO1nAoYasLk8OoRLe7DUvvJ0V77Wlj4frc/Seminarios"
                fetch(urlSeminario)
                .then(sem => sem.json())
                .then(dSem => {
                    if(parseInt(tarea.Tarea) <= 0 || parseInt(tarea.Examen) <= 0){                    
                        const Seminario = dSem.find(info => info.tareaArchivo === tarea.Codigo)
                        tr.innerHTML = `<td>${tarea.Referencia}</td>
                                        <td>${Seminario.tituloSeminario}</td>
                                        <td>${Usuario.Nombre}</td>
                                        <td>
                                            <div class="input-acciones">
                                                <input type="text" value="${tarea.Examen}" class="inputTD" id="exa-${tarea.Referencia}">
                                                <input type=checkbox id="e-${tarea.Referencia}" style="display:none">
                                                <div class="boton-modal">
                                                    <button onclick="verTarea('ex-${tarea.Referencia}')">
                                                        <span>Examen</span>
                                                    </button>
                                                </div>
                                                <div class="container-modal" id="ex-${tarea.Referencia}">
                                                    <div class="content-modal">
                                                        <h2>${Seminario.tituloSeminario}</h2>
                                                        <embed src="${Seminario.linkResultadoExamen}" width="100%" height="450px">
                                                        <button class="btn-cerrar" onclick="cerrarTarea('ex-${tarea.Referencia}')">Cerrar</button>
                                                    </div>
                                                </div>
                                            </div>                                    
                                        </td>
                                        <td>
                                            <div class="input-acciones">
                                                <input type="text" value="${tarea.Tarea}" class="inputTD" id="tar-${tarea.Referencia}">
                                                <input type="checkbox" id="l-${tarea.Referencia}" style="display:none">
                                                <div class="boton-modal">
                                                    <button onclick="verTarea('s-${tarea.Referencia}')">
                                                        <i class='bx bx-folder-open' ></i><span>Tarea</span>
                                                    </button>
                                                </div>
                                                <div class="container-modal" id="s-${tarea.Referencia}">
                                                    <div class="content-modal">
                                                        <h2>${Seminario.tituloSeminario}</h2>
                                                        <embed src="${tarea.LinkTarea}" width="100%" height="450px">
                                                        <button class="btn-cerrar" onclick="cerrarTarea('s-${tarea.Referencia}')">Cerrar</button>
                                                    </div>
                                                </div>
                                            </div> 
                                        </td>
                                        <td>
                                            <div class="input-acciones">
                                                <button value="${tarea.Referencia}" class="btnRegistrar" onclick="evaluacionRegistro('exa-${tarea.Referencia}', 'tar-${tarea.Referencia}', '${sessionStorage.getItem("Nombre")}', '${tarea.Referencia}', '${Usuario.Nombre}')">
                                                    <i class='bx bx-save'></i>
                                                    <span>Registrar</span>
                                                </button>
                                            </div>
                                        </td>`
                        tabla.appendChild(tr)
                    }
                })
            })
        }
    })
})