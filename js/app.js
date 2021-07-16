// CLASE
class Todo {
    constructor(value) {
        this.value = value;
    }
}


// VARIABLES
const addBtn = document.querySelector('.add');
const deleteAllBtn = document.querySelector('.deleteAll');
let todosContainer = document.querySelector('.activities-container');
const input = document.querySelector('.options-input');
let todoList = [];


// FUNCIONES

// Carga los EventListeners 
function loadEventListeners() {
    addBtn.addEventListener('click', addTodo);

    deleteAllBtn.addEventListener('click', () => {
        // Elimina todos los to do's
        const deleteAll = () => {
            todoList = [];
            cleanHTML();
        }
        setTimeout(deleteAll, 300);
    });

    todosContainer.addEventListener('click', deleteTodo);
}

// Agrega un todo
function addTodo() {
    cleanHTML();
    const newTodo = createTodo();
    addTodoToArray(newTodo);
    addId(todoList, newTodo);
    clearInput();
    todoHTML();
}

// Agrega un todo al array
function addTodoToArray(todo) {
    todoList = [...todoList, todo];
}

// Limpia el input después de agregar un todo
function clearInput() {
    input.value = '';
}

// Crea un todo
function createTodo() {
    const value = input.value;
    return new Todo(value);
}

// Agrega un id para cada todo
function addId(array, object) {
    for(let i = 0; i < array.length; i++) {
        object.id = i;
    }
}

// Muestra los todo en el HTML
function todoHTML() {
    todoList.forEach(todo => {
        const card = document.createElement('div');
        card.classList.add('todo');
        card.setAttribute('data-id', `${todo.id}`);
        card.innerHTML = `
            <p>${todo.value}</p>
            <button class="delete">X</button>
        `;
        todosContainer.appendChild(card);
    })
}

// Limpia el HTML antes de agregar otro todo
function cleanHTML() {
    while(todosContainer.firstChild) {
        todosContainer.removeChild(todosContainer.firstChild);
    };
}

// Elimina un todo según su Id
function deleteTodo(e) {
    const deleteBtn = e.target.classList.contains('delete');
    const id = e.target.parentElement.getAttribute('data-id');
    const deleteAction = () => {
        if(deleteBtn) {
            for(let i = 0; i < todoList.length; i++) {
                if(id == todoList[i].id) {
                    todoList.splice(i, 1);
                    cleanHTML();
                    todoHTML();
                }
            }
        }
    }
    setTimeout(deleteAction, 200);
}

loadEventListeners();