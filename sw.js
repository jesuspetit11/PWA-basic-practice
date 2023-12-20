//Como instalar el sw
//No puede usar window
const nombreCache = 'apv-v5';

const errorPagina = './error.html';

const archivos = [
    './',
    './index.html',
    errorPagina,
    './css/bootstrap.css',
    './css/styles.css',
    './js/app.js',
    './js/apv.js',
    'manifest.json'
];

//Cuando se instala el SW
self.addEventListener("install", e =>{
    //Cuando se instala sirve para cachtear archivos
    console.log("Instalado el SW");

    //Hacemos el catching de los archivos
    e.waitUntil(
        caches.open(nombreCache)
            .then(cache =>{
                console.log("cacheando...")
                cache.addAll(archivos);
            })
    )
});

//Activar el SW
self.addEventListener("activate", e=>{
    console.log("Service Worker Activado");
    
    //Cuando se activa sirve para nuevas versiones de la PWA
    e.waitUntil(
        caches.keys()
            .then(keys => {
                // console.log(keys);
                return Promise.all(
                    keys.filter(key => key != nombreCache)
                    .map(key => caches.delete(key))
                )
            })
    )
});

// Evento fetch para descargar archivos estáticos
self.addEventListener('fetch', e => {
    console.log('Fetch..', e);

    e.respondWith(
        caches.match(e.request)
            .then(respuestaCache => {
                return (respuestaCache ? respuestaCache : caches.match(errorPagina))
            })
        // .cache(() => caches.match('./error.html'))
    )
})