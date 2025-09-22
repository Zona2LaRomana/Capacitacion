document.getElementById("txtBuscar").addEventListener("input", onInputChange)

function onInputChange(){
    let inputText = document.getElementById("txtBuscar").value.toString().toLowerCase()
    /*
    let tableBody = document.getElementById("tbody-evaluaciones")
    let tableRows = tableBody.getElementsByTagName("tr")
    
    

    for(let i = 0; i < tableRows.length; i++){
        let textoConsulta = tableRows[i].cells[1].textContent.toString().toLowerCase()
        if(textoConsulta.indexOf(inputText) === -1){
            tableRows[i].style.display = "none"
        }else{
            tableRows[i].style.display = ""
        }
    }*/

    let tableRows = document.querySelectorAll("#tbody-evaluaciones tr")
    console.log(tableRows.length)
    tableRows.forEach(row => {
        let textoConsulta = row.cells[2]?.textContent.toLowerCase() || ""
        if(!textoConsulta.includes(inputText)){
            row.style.display = "none"
        }else{
            row.style.display = ""
        }
    })
}