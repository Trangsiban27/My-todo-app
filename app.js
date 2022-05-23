const input = document.querySelector('.input input');
const addBtn = document.querySelector('.add-btn');
const todos = document.querySelector('.todos');

function handlerEvent() {
    addBtn.onclick = () => {
        var val = input.value.trim();
    
        if(val) {
            addTodoElement({
                text: val
            })

            saveTodoList();
        }
        input.value = '';
    }

    input.onkeydown = (e) => {
        if(e.key === 'Enter') {
            var val = input.value.trim();
    
            if(val) {
                addTodoElement({
                    text: val
                })

                saveTodoList();
            }
            input.value = '';
        }
    }

}

function addTodoElement(todo) {
    var li = document.createElement('li');

    li.innerHTML = `
        <span>${todo.text}</span>
        <i class="trash-icon fa-solid fa-trash"></i>
    `

    if(todo.status === 'completed') {
        li.setAttribute('class', 'completed');
    }

    li.onclick = () => {
        li.classList.toggle('completed');
        saveTodoList();
    }

    li.querySelector('.trash-icon').onclick = () => {
        li.remove();
        saveTodoList();
    }

    todos.appendChild(li);
}

function saveTodoList() {
    var todoLists = document.querySelectorAll('li');
    var todoStorage = [];

    todoLists.forEach((item) => {
        let text = item.querySelector('span').innerText;
        let status = item.getAttribute('class');

        todoStorage.push({
            text,
            status
        })
    })

    localStorage.setItem('todoList', JSON.stringify(todoStorage));
}

function init() {
    var data = JSON.parse(localStorage.getItem('todoList'));

    data.forEach((item) => {
        addTodoElement(item);
    })
}
function start() {
    handlerEvent();
    init();
}

start();