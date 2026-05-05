const addbtn = document.getElementById('addbtn');
const todoInput = document.getElementById('todo');
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Your local array - this is the source of truth for the UI!
let todolist = [];
let userID = 1;

// 1. INITIAL LOAD (GET)
// Fetch 3 tasks just to populate the list when the page opens
document.addEventListener('DOMContentLoaded', () => {
    fetch(`${API_URL}?_limit=3`)
        .then(response => response.json())
        .then(tasks => {
            todolist = tasks; // Put the fake tasks into our array
            render();         // Draw them!
        })
        .catch(error => console.log("Error fetching initial tasks:", error));
});


// 2. THE UI RENDERER
const render = () => {
    const taskListDiv = document.getElementById('task-list');
    taskListDiv.innerHTML = ""; // Clear the old list
    
    todolist.forEach((task) => {
        // Notice how we use ${task.id} to make the IDs and 'for' attributes unique!
        // We also add data-id="${task.id}" to the button so we know what to delete
        taskListDiv.innerHTML += `
            <div class="card px-2 mb-2">
                <div class="d-flex justify-content-between align-items-center py-2">
                    <div class="form-check mb-0">
                        <input type="checkbox" class="form-check-input" id="check-${task.id}" ${task.completed ? 'checked' : ''} />
                        <label class="form-check-label ms-2 ${task.completed ? 'text-decoration-line-through text-muted' : ''}" for="check-${task.id}">${task.title}</label>
                    </div>
                    <div>
                        <button type="button" data-id="${task.id}" class="remove-btn text-white btn btn-danger btn-sm">
                            Remove
                        </button>
                    </div>
                </div>
            </div>`;
    });
    
    // Only show the card if there are tasks
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
        body: JSON.stringify({
            title: taskText,
            completed: false,
            userId: userID
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then(newTask => {
        console.log("Server Saved : ", newTask);
        
        // Push to local array and re-render
        todolist.push(newTask);
        todoInput.value = "";
        render();
        
        // Show Success Message
        const successMsg = document.getElementById('successmsg');
        successMsg.classList.remove('d-none');
        setTimeout(() => successMsg.classList.add('d-none'), 2000);
    })
    .catch(error => {
        console.log("Error: ", error);
        const errorMsg = document.getElementById('errormsg');
        errorMsg.classList.remove('d-none');
        setTimeout(() => errorMsg.classList.add('d-none'), 2000);
    });
});

document.getElementById('task-list').addEventListener('click',function(event){
    if (event.target.classList.contains('remove-btn')){
        const taskId = event.target.getAttribute('data-id');

        fetch(`${API_URL}/${taskId}`,{
            method: 'DELETE',
        })
        .then(response => {
            if(response.ok){
                console.log(`Deleted from Server task #${taskId}`);

                todolist = todolist.filter(task => task.id != taskId);

                render();
                
            }
        })
        .catch(error => {
            console.log("Error deletind the task : ",error);
            
        });
    }
});

