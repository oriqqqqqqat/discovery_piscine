window.onload = function() {
    loadTodos();
};

function newTodo() {
    let task = prompt("Enter a new TO DO:");
    if (task && task.trim() !== "") {
        addTodo(task);
        saveTodos();
    }
}

function addTodo(text) {
    let ft_list = document.getElementById("ft_list");
    let div = document.createElement("div");
    div.className = "todo";
    div.textContent = text;

    div.onclick = function() {
        if (confirm("Do you want to remove this TO DO?")) {
            ft_list.removeChild(div);
            saveTodos();
        }
    };

    ft_list.appendChild(div);
}

function saveTodos() {
    let todos = [];
    let items = document.querySelectorAll("#ft_list .todo");
    items.forEach(item => todos.push(item.textContent));
    document.cookie = "todos=" + JSON.stringify(todos) + ";path=/";
}

function loadTodos() {
    let cookies = document.cookie.split(";");
    for (let c of cookies) {
        let [name, value] = c.trim().split("=");
        if (name === "todos") {
            let todos = JSON.parse(value);
            todos.forEach(t => addTodo(t));
        }
    }
}
