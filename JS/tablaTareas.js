const urlTarea = "https://opensheet.elk.sh/1NlhcKqmAIVO1nAoYasLk8OoRLe7DUvvJ0V77Wlj4frc/Tareas"

const tabla = document.getElementById("tTareas")

fetch(urlTarea)
.then(res => res.json())
.then(data => {
    const registro = data.forEach(tarea => {
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
                const Seminario = dSem.find(info => info.tareaArchivo === tarea.Codigo)
                tr.innerHTML = `<td>${tarea.Referencia}</td>
                                <td>${Seminario.tituloSeminario}</td>
                                <td>${Usuario.Nombre}</td>
                                <td>
                                    <div class="input-acciones">
                                        <input type="text" value="${tarea.Examen}" class="inputTD" id="exa-${tarea.Referencia}">
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
            })
        })
    })
})