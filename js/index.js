$(".submit").click(function()
{
    const tarea = $(".tarea")
    const nombreTarea = tarea.val()
    tarea.val("")
    $("ul").append("<li>"+nombreTarea+"<span class='right'>Ok</span> </li>")

})

function getData()
{
    $.getJSON('js/json_data.json', function(read_data) {
        for(var i = 0; i < read_data.result.length; i++)
        {
            $("ul").append("<li>"+read_data.result[i].option+"<span class='right'>"
            +
            read_data.result[i].percent
            +
            "</span></li>");
            console.log(read_data.result[i]);
        }
    })
}

getData()