const sb = window.supabase.createClient(
    "https://onfccgeapychxhlrstex.supabase.co",
    "sb_publishable_iIE-olKlfIqdPwmi0HJsTQ_33VbluMY"
)

const Nombre = sessionStorage.getItem("Nombre")
const Codigo = sessionStorage.getItem("Codigo")
const Oficial = sessionStorage.getItem("Oficial")
const reem = sessionStorage.getItem("passwr")

//Determinacion de Fecha del Sistema
const fechaSistema = new Date()
const fechaActual = fechaSistema.getFullYear() +"-"+ (fechaSistema.getMonth() + 1) +"-"+ fechaSistema.getDate()

if(Nombre){
    document.getElementById("user").innerHTML = Nombre

    if(reem === "1"){
        Swal.fire({
          title: "Actualizar contraseña",
        html: `
            <label for="password1">Bienvenido/a, esta opción se habilita para hacer de su cuenta más segura, por favor cambie su contraseña</label>
            <input id="password1" type="password" class="swal2-input" placeholder="Nueva contraseña">
            <input id="password2" type="password" class="swal2-input" placeholder="Confirmar contraseña">
        `,
          showCancelButton: true,
          confirmButtonText: "Actualizar",
          showLoaderOnConfirm: true,
          preConfirm: async () => {
            const pass1 = document.getElementById("password1").value;
            const pass2 = document.getElementById("password2").value;

            if (!pass1 || !pass2) {
              Swal.showValidationMessage("Ambos campos son obligatorios");
              return false;
            }

            if (pass1 !== pass2) {
              Swal.showValidationMessage("Las contraseñas no coinciden");
              return false;
            }

            // Aquí puedes hacer tu llamada al backend
            try {
              // Ejemplo simulado
              const { data, error } = await sb.rpc("sp_actualizar_pwd", {
                pwd: pass1, 
                cod: Codigo
              })

              await new Promise(resolve => setTimeout(resolve, 1000));

              return pass1;
            } catch (error) {
              Swal.showValidationMessage(`Error: ${error}`);
            }
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Éxito", "Contraseña actualizada correctamente", "success");
          }
        });
    }

    let navBar = []
    const lista = document.getElementById("listaNav")
    const taller = document.getElementById("section")
  
    obtener_accesos(Codigo).then(dato => {
        navBar = dato
        if(navBar.length === 0){
            lista.innerHTML = "<li>No hay datos disponibles</li>"
        }else{
            navBar.forEach(certificados => {
                const li = document.createElement("li")
                li.innerHTML = `<a href="#" onclick="${certificados.code}">
                                <img src="IMG/Icons/${certificados.imgagen}" class="icon">
                                <label for="" class="nav-item">${certificados.certificado}</label>
                                </a>`
                lista.appendChild(li)
                let cursos = []
                obtener_seminarios(certificados.codigo).then(sem => {
                    cursos = sem             
                    if(cursos.length === 0){
                        //taller.innerHTML = `<div>No hay datos disponibles</div>`
                    }else{
                        let evaluador, examen1, tarea1, display = "block"
                        cursos.forEach(talleres => {
                            //Esta parte para los resultados
                            examen1 = "0"
                            tarea1 = "0"
                            evaluador = "N/A"
                            display = "block"
                            verExamen = "block"
                            //Esta parte para los resultados
                            let frameVideo
                            if(talleres.cap_sem == "PAT-Consej"){
                                frameVideo = talleres.fra_sem
                            }else{
                                frameVideo = `<iframe style="visibility:${talleres.finalizar}" id="v-${talleres.cod_sem}" width="100%" height="300" src="${talleres.fra_sem}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
                            }
                            const div = document.createElement("div")
                            div.innerHTML = `<div class="card-seminarios" name="${talleres.cap_sem}">
                                                <div class="card">
                                                    <img src="IMG/Icons/${talleres.log_sem}">
                                                    <div class="card-content">
                                                        <h3>${talleres.tit_sem}</h3>
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
                                                            <button onclick="activarSeminario('${talleres.cod_sem}', 'v-${talleres.cod_sem}')">Ver Seminario</button>
                                                        </div>
                                                        <div class="taller" id="${talleres.cod_sem}">
                                                            <div class="content-taller">
                                                                <h3>${talleres.tit_sem}</h3>
                                                                ${frameVideo}
                                                                <p>${talleres.des_sem}</p>
                                                                <div class="asignaciones">
                                                                    <div class="asignacion" <!--style="display:${verExamen}"-->>
                                                                        <h5>Realiza el Examen</h5>
                                                                        <a href="${talleres.linkexamen}" target="_blank" rel="noopener noreferrer">
                                                                            Examen de la Asignación
                                                                        </a>
                                                                    </div>
                                                                    <div class="asignacion">
                                                                        <h5>Realiza la Tarea</h5>
                                                                        <a href="${talleres.linktarea}" target="_blank" rel="noopener noreferrer">
                                                                            Decarga la Tarea
                                                                        </a>
                                                                        <input type="file" id="${talleres.tar_sem}" style="display: ${display}" accept="application/pdf">
                                                                        <p id="${talleres.res_sem}"></p>
                                                                        <button onclick="subirArchivo('${talleres.tar_sem}', '${Codigo}', '${talleres.res_sem}')" style="display: ${display}">
                                                                            Entregar Tarea
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <button onclick="desactivarSeminario('${talleres.cod_sem}')">Cerrar</button>
                                                            </div>
                                                        </div>
                                                    </div>`
                                    taller.appendChild(div)
                        })
                    }
                })
            })
        }
    })
    
}else{
    window.location.href = "login.html"
}

async function obtener_accesos(user_codigo){
    const {data, error} = await sb.rpc("sb_accesos", {
        cod_user: user_codigo
    })
    return data
}

async function obtener_seminarios(seminario){
    const {data, error} = await sb.rpc("sp_seminarios", {
        codigo: seminario
    })
    return data
}