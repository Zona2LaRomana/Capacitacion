let temporizador

function Reiniciar(){
    clearTimeout(temporizador)
    temporizador = setTimeout(() => {
        sessionStorage.clear()
        alert('La Session a expirado')
        location.reload()
    }, 30 * 60 * 1000)
}

window.onload = Reiniciar()
document.onmousemove = Reiniciar()
document.onkeydown = Reiniciar()