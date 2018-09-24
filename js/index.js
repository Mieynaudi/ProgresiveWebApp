app = {
    "data": []
}

Notification.requestPermission().then(() => new Notification('Bienvenido!'))

initialData = [{
    "name": "Ir al supermercado",
    "done": false,
    "time": 100
}, {
    "name": "Hacer mi tarea",
    "done": true,
    "time": 120
}, {
    "name": "Hacer tutorial WebAssembly",
    "done": false,
    "time": 15
}]

app.addTodo = function (name, isDone, time) {
    app.data.push({
        "name": name,
        "done": isDone,
        "time": time
    })
    let ischecked = isDone ? "checked" : ""
    if (name != "") {
        document.querySelector("ul").insertAdjacentHTML("beforeend",
            "<li name = new title = "+ time +">" +
            name +
            "<span class='right'> <span class='timer'></span> <input type='checkbox' " +
            ischecked +
            "> </span></li>")
    }
    app.saveData() // persiste el nuevo ToDo a localstorage
    app.refresh_time()
}

app.refresh_time = function() {
    document.querySelectorAll("li").forEach(function(element, i){
        console.log(i)
        if (element.getAttribute("name") == 'new')
        {
            element.setAttribute("name", "used")
        // var countDownDate = new Date(element.title + 1000 * 10 ).getTime();
            var x = setInterval(function() {
                element.title = element.title - 1
                if (element.title == 0) {
                    element.querySelector('.timer').innerHTML = "Expired";
                    clearInterval(x)
                    new Notification("Expiro " + app.data[i].name)
                }
                else
                {
                    var minutes = Math.floor((element.title / 60));
                    var seconds = Math.floor((element.title % 60));
                    element.querySelector('.timer').innerHTML = minutes.toString().padStart(2,0) + ":" + seconds.toString().padStart(2,0);
                    app.data[i].time = element.title
                    app.saveData()
                }
            }, 1000);
        }
    })
    }

document.getElementById('submitButton').addEventListener('click', function () {
    const tarea = document.getElementById('tareaInput')
    const nombreTarea = tarea.value
    app.addTodo(nombreTarea, false, 300)
    tarea.value = ""
})

app.initialize = function () {
    let url = "http://127.0.0.1:8887"
    if (localStorage.data) {
        console.log("localstorage disponible")
        console.log(JSON.parse(localStorage.data))
        JSON.parse(localStorage.data).forEach(element => {
            app.addTodo(element.name, element.done, element.time)
        })
    } else {
        console.log("localstorage no disponible")
        initialData.forEach(element => {
            app.addTodo(element.name, element.done, element.time)
        });
    }

}

app.saveData = function () {
    var savedData = JSON.stringify(app.data);
    localStorage.data = savedData;
}

app.initialize()


