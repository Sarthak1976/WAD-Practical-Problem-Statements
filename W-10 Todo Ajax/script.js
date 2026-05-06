const addbtn = document.getElementById('addbtn');
const todoInput = document.getElementById('todo');
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

let todolist = [];

// 1. INITIAL LOAD (GET)
document.addEventListener('DOMContentLoaded', () => {
    fetch(`${API_URL}?_limit=3`)
        .then(response => response.json())
        .then(tasks => {
            todolist = tasks; 
            render();         
        })
        .catch(error => console.log(error));
});

// 2. RENDER UI
const render = () => {
    const taskListDiv = document.getElementById('task-list');
    taskListDiv.innerHTML = ""; 
    
    todolist.forEach((task) => {
        taskListDiv.innerHTML += `
            <div class="card px-2 mb-2 border">
                <div class="d-flex justify-content-between align-items-center py-2">
                    <div class="fw-bold text-dark">${task.title}</div>
                    <div>
                        <button type="button" onclick="editTask(this, ${task.id}, '${task.title}')" class="btn btn-warning btn-sm text-white me-1">Edit</button>
                        <button type="button" onclick="deleteTask(this, ${task.id})" class="btn btn-danger btn-sm text-white">Remove</button>
                    </div>
                </div>
            </div>`;
    });
    
    // Show/Hide List Container
    if (todolist.length > 0) {
        document.getElementById('listCard').classList.remove('d-none');
    } else {
        document.getElementById('listCard').classList.add('d-none');
    }
}

// 3. ADD A TASK (POST)
addbtn.addEventListener('click', function () {
    const taskText = todoInput.value.trim();
    if (taskText === "") return alert("Please enter a task!");

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ title: taskText }), // Brutally simple payload
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    .then(response => response.json())
    .then(newTask => {
        todolist.push(newTask);
        todoInput.value = "";
        render();
        
        document.getElementById('successmsg').classList.remove('d-none');
        setTimeout(() => document.getElementById('successmsg').classList.add('d-none'), 2000);
    })
    .catch(error => {
        document.getElementById('errormsg').classList.remove('d-none');
        setTimeout(() => document.getElementById('errormsg').classList.add('d-none'), 2000);
    });
});

// 4. THE DELETE HACK (DELETE)
function deleteTask(buttonElement, taskId) {
    fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if(response.ok){
            // Remove from array memory
            todolist = todolist.filter(task => task.id != taskId);
            
            // Instantly wipe the card off the screen
            buttonElement.closest('.card').remove(); 
            
            // Hide the main container if empty
            if (todolist.length === 0) {
                document.getElementById('listCard').classList.add('d-none');
            }
        }
    })
    .catch(error => console.log(error));
}

// 5. THE UPDATE HACK
function editTask(buttonElement, taskId, oldTitle) {
    document.getElementById('todo').value = oldTitle; // Move text to input
    deleteTask(buttonElement, taskId);                // Destroy old version
    document.getElementById('todo').focus();          // Focus input
}
