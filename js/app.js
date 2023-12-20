//Verificamos si el navegador soporta el service worker

if( "serviceWorker"  in navigator ){
    navigator.serviceWorker.register("./sw.js") //Nos retorna un promise, el valor de registrado
    .then(registrado => console.log("Se instalo correctamente...", registrado))
    .catch(error => console.log("Fallo la instalación", error));
} else {
    console.log("Service worker no soportado");
}