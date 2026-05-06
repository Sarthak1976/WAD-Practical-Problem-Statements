const addbtn = document.getElementById('addbtn');
const todoInput = document.getElementById('todo');
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

let todolist = [];
let userID = 1;

// 1. INITIAL LOAD (AJAX GET)
document.addEventListener('DOMContentLoaded', () => {
    fetch(`${API_URL}?_limit=3`)
        .then(response => response.json())
        .then(tasks => {
            todolist = tasks; 
            render();         
        })
        .catch(error => console.log("Error fetching initial tasks:", error));
});


// 2. THE UI RENDERER
const render = () => {
    const taskListDiv = document.getElementById('task-list');
    taskListDiv.innerHTML = ""; // Clear the old list
    
    todolist.forEach((task) => {
        // Notice the onclick events injected directly into the buttons!
        taskListDiv.innerHTML += `
            <div class="card px-2 mb-2">
                <div class="d-flex justify-content-between align-items-center py-2">
                    <div class="form-check mb-0">
                        <input type="checkbox" class="form-check-input" id="check-${task.id}" ${task.completed ? 'checked' : ''} />
                        <label class="form-check-label ms-2 ${task.completed ? 'text-decoration-line-through text-muted' : ''}" for="check-${task.id}">${task.title}</label>
                    </div>
                    <div>
                        <button type="button" onclick="editTask(this, ${task.id}, '${task.title}')" class="btn btn-warning btn-sm text-white me-1">
                            Edit
                        </button>
                        <button type="button" onclick="deleteTask(this, ${task.id})" class="btn btn-danger btn-sm text-white">
                            Remove
                        </button>
                    </div>
                </div>
            </div>`;
    });
    
    // Show or hide the main list card
    if (todolist.length > 0) {
        document.getElementById('listCard').classList.remove('d-none');
    } else {
        document.getElementById('listCard').classList.add('d-none');
    }
}


// 3. ADD A TASK (AJAX POST)
addbtn.addEventListener('click', function () {
    const taskText = todoInput.value.trim();
    if (taskText === "") return alert("Please enter a task!");

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
            title: taskText,
            completed: false,
            userId: userID
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    .then(response => response.json())
    .then(newTask => {
        // Add to array and redraw everything
        todolist.push(newTask);
        todoInput.value = "";
        render();
        
        // Show Success Message
        const successMsg = document.getElementById('successmsg');
        successMsg.classList.remove('d-none');
        setTimeout(() => successMsg.classList.add('d-none'), 2000);
    })
    .catch(error => {
        const errorMsg = document.getElementById('errormsg');
        errorMsg.classList.remove('d-none');
        setTimeout(() => errorMsg.classList.add('d-none'), 2000);
    });
});


// 4. THE DELETE HACK (AJAX DELETE + DOM Removal)
function deleteTask(buttonElement, taskId) {
    fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if(response.ok){
            // 1. Remove it from our local array so it doesn't respawn later
            todolist = todolist.filter(task => task.id != taskId);
            
            // 2. Instantly destroy the specific card from the screen 
            buttonElement.closest('.card').remove(); 
            
            // 3. If that was the last task, hide the main list container
            if (todolist.length === 0) {
                document.getElementById('listCard').classList.add('d-none');
            }
        }
    })
    .catch(error => console.log("Error deleting the task: ", error));
}


// 5. THE UPDATE HACK
function editTask(buttonElement, taskId, oldTitle) {
    // 1. Put the text back into the input box
    document.getElementById('todo').value = oldTitle;
    
    // 2. Run the delete function to remove the old version
    deleteTask(buttonElement, taskId);
    
    // 3. Focus the input box so the user can type immediately
    document.getElementById('todo').focus();
}
