//Selectors
 const todoInput = document.querySelector('.todo-input');
 const todoButton = document.querySelector('.todo-button');
 const todoList = document.querySelector('.todo-list');
 const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
//Functions
function addTodo(e) {
  e.preventDefault();
  
  //tododiv
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  //create the list
  const newTodo = document.createElement('li');
  newTodo.classList.add('todo-item');
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);
  //add todolist to local storage
  saveLocalTodos(todoInput.value);
  //buttons div
  const btnGroup = document.createElement('div');
  btnGroup.classList.add('btn-group');
  newTodo.appendChild(btnGroup);

  //complete btn
  const completeButton = document.createElement('button');
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add('complete-btn');
  btnGroup.appendChild(completeButton);

  //remove btn
  const removeButton = document.createElement('button');
  removeButton.innerHTML = '<i class="fas fa-trash"></i>';
  removeButton.classList.add('remove-btn');
  btnGroup.appendChild(removeButton);

  //appent to todolist
  todoList.appendChild(todoDiv);

  //Clear todo input value
  todoInput.value = '';
}


function deleteCheck(e) {
  const item = e.target;

  //remove btn
  if(item.classList[0] === 'remove-btn') {
    const todo = item.parentElement.parentElement.parentElement;
    //Animation
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function() {
      todo.remove();
    });
    //todo.remove();
  }

  //complete btn
  if(item.classList[0] === 'complete-btn') {
    const todo = item.parentElement.parentElement.parentElement;
    todo.classList.toggle('completed');
  }

}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch(e.target.value) {
      case "all":
        todo.style.display = 'block';
        break;
      case "completed":
        if(todo.classList.contains("completed")) {
          todo.style.display = 'block';

        } else {
          todo.style.display = 'none';
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains("completed")) {
          todo.style.display = 'block';

        } else {
          todo.style.display = 'none';
        }
        break;
    } 
  })
}


function saveLocalTodos(todo) {
  //Check 
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodos() {
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo) {
     //tododiv
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create the list
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);
    //buttons div
    const btnGroup = document.createElement('div');
    btnGroup.classList.add('btn-group');
    newTodo.appendChild(btnGroup);

    //complete btn
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    btnGroup.appendChild(completeButton);

    //remove btn
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.classList.add('remove-btn');
    btnGroup.appendChild(removeButton);

    //appent to todolist
    todoList.appendChild(todoDiv);
  })
}

function removeLocalTodos(todo) {
  //Check 
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  console.log(todo.children[0].innerText);
  localStorage.setItem('todos', JSON.stringify(todos));

}