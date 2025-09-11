// โหลดข้อมูลตอนเปิดเว็บ
$(document).ready(function () {
    loadTodos();

    // ผูกปุ่ม newTodo
    $("#newBtn").click(function () {
        let task = prompt("Enter a new TO DO:");
        if (task && task.trim() !== "") {
            addTodo(task);
            saveTodos();
        }
    });
});

// เพิ่ม todo ลง list
function addTodo(text) {
    let $div = $("<div></div>")
        .addClass("todo")
        .text(text)
        .click(function () {
            if (confirm("Do you want to remove this TO DO?")) {
                $(this).remove();
                saveTodos();
            }
        });

    $("#ft_list").append($div);
}

// เก็บ todo ทั้งหมดลง cookie
function saveTodos() {
    let todos = [];
    $("#ft_list .todo").each(function () {
        todos.push($(this).text());
    });
    document.cookie = "todos=" + JSON.stringify(todos) + ";path=/";
}

// โหลด todo จาก cookie
function loadTodos() {
    let cookies = document.cookie.split(";");
    for (let c of cookies) {
        let [name, value] = c.trim().split("=");
        if (name === "todos" && value) {
            let todos = JSON.parse(value);
            todos.forEach(t => addTodo(t));
        }
    }
}
