// โหลดข้อมูลจาก cookie ตอนเปิดเว็บ
window.onload = function() {
    loadTodos();
};

// สร้าง todo ใหม่
function newTodo() {
    let task = prompt("Enter a new TO DO:");
    if (task && task.trim() !== "") {
        addTodo(task);
        saveTodos();
    }
}

// เพิ่ม todo ลง list
function addTodo(text) {
    let ft_list = document.getElementById("ft_list");
    let div = document.createElement("div");
    div.className = "todo";
    div.textContent = text;

    // เวลากดที่ todo → ลบออก (ถามก่อน)
    div.onclick = function() {
        if (confirm("Do you want to remove this TO DO?")) {
            ft_list.removeChild(div);
            saveTodos();
        }
    };

    ft_list.appendChild(div);
}

// เก็บ todo ทั้งหมดลง cookie
function saveTodos() {
    let todos = [];
    let items = document.querySelectorAll("#ft_list .todo");
    items.forEach(item => todos.push(item.textContent));
    document.cookie = "todos=" + JSON.stringify(todos) + ";path=/";
}

// โหลด todo จาก cookie
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
