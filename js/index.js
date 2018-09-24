app = {
    "data": []
}


initialData = [{
    "name": "Ir al supermercado",
    "done": false
}, {
    "name": "Hacer mi tarea",
    "done": true
}, {
    "name": "Hacer tutorial WebAssembly",
    "done": false
}]

app.addTodo = function (name, isDone) {
    console.log(name)
    app.data.push({
        "name": name,
        "done": isDone
    })
    let ischecked = isDone ? "checked" : ""
    if (name != "") {
        document.querySelector("ul").insertAdjacentHTML("beforeend",
            "<li>" +
            name +
            "<span class='right'> <input type='checkbox' " +
            ischecked +
            "> </span> </li>")
    }
    app.saveData()
}

document.getElementById('submitButton').addEventListener('click', function () {
    const tarea = document.getElementById('tareaInput')
    const nombreTarea = tarea.value
    app.addTodo(nombreTarea, false)
    tarea.value = ""
})

app.initialize = function () {
    let url = "http://127.0.0.1:8887"
    if ('caches' in window) {
        /*
         * Check if the service worker has already cached data. 
         * If the service worker has the data, then display the cached
         * data while the app fetches the latest data.
         */

    }
    initialData.forEach(element => {
        app.addTodo(element.name, element.done)
    });
}

app.saveData = function () {
    var savedData = JSON.stringify(app.data);
    localStorage.data = savedData;
}

app.initialize()