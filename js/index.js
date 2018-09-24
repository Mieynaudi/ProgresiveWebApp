app = {
    "initialData": [{
        "name": "Ir al supermercado",
        "done": false
    }, {
        "name": "Hacer mi tarea",
        "done": true
    }, {
        "name": "Hacer tutorial WebAssembly",
        "done": false
    }]
}

app.addTodo = function () {
    const tarea = document.getElementById('tareaInput')
    const nombreTarea = tarea.value
    console.log(nombreTarea)
    tarea.value = ""
    if (nombreTarea != "") {
        document.querySelector("ul").insertAdjacentHTML("beforeend",
            "<li>" +
            nombreTarea +
            "<span class='right'> <input type='checkbox'> </span> </li>")
    }
}

document.getElementById('submitButton').addEventListener('click', app.addTodo)

app.initialize = function () {
    let url = "http://127.0.0.1:8887"
    if ('caches' in window) {
        /*
         * Check if the service worker has already cached data. 
         * If the service worker has the data, then display the cached
         * data while the app fetches the latest data.
         */

    }
    app.initialData.forEach(element => {
        let ischecked = element.done ? "checked" : ""
        document.querySelector("ul").insertAdjacentHTML("beforeend",
            "<li>" +
            element.name +
            "<span class='right'> <input type='checkbox' " +
            ischecked +
            "> </span> </li>")
    });

}

app.initialize()