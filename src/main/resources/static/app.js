const todoForm = document.getElementById("todoForm")
const todoInput = document.getElementById("todoInput")
const todoList = document.getElementById("todoList")

const api_url = "/api/todos"

async function loadTodos() {
    const response = await fetch(api_url)
    const todos = await response.json()

    todoList.innerHTML = ""

    todos.forEach(todo => {
        const li = document.createElement("li")

        const span = document.createElement("span")
        span.textContent = todo.title

        if (todo.completed) {
            span.classList.add("completed")
        }

        span.addEventListener("click", () => {
            updateTodo(todo.id, todo.title, !todo.completed)
        })

        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete"
        deleteButton.addEventListener("click", () => {
            deleteTodo(todo.id)
        })

        li.appendChild(span)
        li.appendChild(deleteButton)
        todoList.appendChild(li)
    })

}

async function addTodo(title) {
    await fetch(api_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            completed: false
        })
    })

    loadTodos()

}

async function updateTodo(id, title, completed) {
    await fetch(`${api_url}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            completed: completed
        })
    })

    loadTodos()
}

async function deleteTodo(id) {
    await fetch(`${api_url}/${id}`, {
        method: "DELETE"
    })

    loadTodos()
}


loadTodos()