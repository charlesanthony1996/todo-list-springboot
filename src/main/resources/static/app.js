const todoForm = document.getElementById("todoForm")
const todoInput = document.getElementById("todoInput")
const todoList = document.getElementById("todoList")

const api_url = "/api/todos"

async function loadTodos() {
    const response = await fetch(api)
    const todos = await response.json()

    todos.innerHTML = ""

    todos.forEach(todo => {
        const li = document.createElement("li")

        const span = document.createElement("span")

    })

}

async function addTodo() {


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