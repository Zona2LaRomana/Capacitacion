function validarCertificaciones(){
    var checks=document.querySelectorAll('input[name="certificaciones"]:checked');
    if(checks.length===0){
        alert("Debe seleccionar al menos una certificación.");
        return false;
    }
    return true;
}

function mostrarPago(){
    var metodo=document.getElementById("metodoPago").value;
    var voucher=document.getElementById("campoVoucher");
    var efectivo=document.getElementById("campoEfectivo");
    if(metodo==="transferencia" || metodo==="deposito"){
        voucher.classList.remove("hidden");
        efectivo.classList.add("hidden");
    }else if(metodo==="efectivo"){
        efectivo.classList.remove("hidden");
        voucher.classList.add("hidden");
    }else{
        voucher.classList.add("hidden");
        efectivo.classList.add("hidden");
    }
}

function mostrarCertificacionesPrevias(){
    var respuesta=document.getElementById("ddlPrevias").value;
    var campo=document.getElementById("campoCertificacionesPrevias");
    if(respuesta=="1"){
        campo.classList.remove("hidden");
    }else{
        campo.classList.add("hidden");
    }
}