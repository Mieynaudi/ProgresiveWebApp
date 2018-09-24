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

// EVENT LISTENERS FROMDE LA UI
document.getElementById('submitButton').addEventListener('click', function () {
    const tarea = document.getElementById('tareaInput')
    const nombreTarea = tarea.value
    app.addTodo(nombreTarea, false)
    tarea.value = ""
})

// METODOS PARA ACTUALIZAR UI
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
    app.saveData() // persiste el nuevo ToDo a localstorage
}

app.initialize = function () {
    let url = "http://127.0.0.1:8887"
    if (localStorage.data) {
        console.log("localstorage disponible")
        console.log(JSON.parse(localStorage.data))
        JSON.parse(localStorage.data).forEach(element => {
            app.addTodo(element.name, element.done)
        })
    } else {
        console.log("localstorage no disponible")
        initialData.forEach(element => {
            app.addTodo(element.name, element.done)
        });
    }

}

app.saveData = function () {
    var savedData = JSON.stringify(app.data);
    localStorage.data = savedData;
}

app.initialize()