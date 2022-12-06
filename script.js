let todos = []
let from;
let to;

// Get HTML element references
const addButton = document.getElementById('add');
const task = document.getElementById('task');
const time = document.getElementById('time');
const error = document.getElementById('error');
const list = document.getElementById('todos');

// Add event listener to add button
addButton.addEventListener('click', addHandler);

/* Use JS event delegation to listen for events from dynamically created 
elements, (i.e. the delete buttons) and apply a handler to them dynamically. 
We obtain the index from the buttons PARENT element (ul element) and pass to 
delete function */
// TLDR; Adds delete handlers to delete buttons as we create them
list.addEventListener('click', ({ target }) => {
  if (!target.matches('blockquote > button')) return;
  const lis = [...list.children];
  const index = lis.indexOf(target.parentNode.id);
  deleteHandler(index);
});

// Event Handlers
function addHandler () {
    console.log("adding")
    error.innerHTML = ''
    if ((task.value == '' && time.value == '') 
        || (task.value == '' || time.value == '')) {
        error.innerHTML = errorComponent();
    } else {
        let id = todos.length == 0 ? 0 : todos.length 
        todos.push({id: id, task: task.value, time: time.value});
        renderTasks();
        emptyFields();
    };
};

function deleteHandler(index) {
    todos.splice(index, 1);
    fixOrder();
    renderTasks();
}

// Helper functions
function fixOrder() {
    todos.forEach((item, i) => {
        item.id = i;
    });
};

function emptyFields() {
    time.value = ''
    task.value = ''
};

function renderTasks() {
    list.innerHTML = ''
    todos.forEach(task => {
        list.innerHTML += taskComponent(task)
    });
};

// Component functions
function taskComponent(task) {
    return "<blockquote id=" + task.id +" draggable='true'>"
    + task.task + " " + task.time +' '+"<button>"+'delete'+"</button>"+"</blockquote>"
};

function errorComponent() {
    return "<p>"+'Please enter a value for both fields'+"<p>"
};

// Drag & Drop functions
function arrayMove(arr, fromIndex, toIndex) {
    var fromTask = arr[fromIndex];
    var toTask = arr[toIndex]

    fromTask.id = toIndex
    toTask.id = fromIndex

    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, fromTask);
};

document.addEventListener("dragstart", ({target}) => {
    from = target.id;
});

document.addEventListener("dragover", (event) => {
    event.preventDefault();
});

document.addEventListener("drop", ({target}) => {
    to = target.id
    arrayMove(todos, from, to)
    renderTasks()
});