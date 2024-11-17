document.addEventListener('DOMContentLoaded', () => {
    checkEmptyList('pending-tasks');
    checkEmptyList('completed-tasks');
    setMinDateTime();
});

function setMinDateTime() {
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const currentDate = `${year}-${month}-${day}`;
    const currentTime = `${hours}:${minutes}`;

    dateInput.min = currentDate;
    timeInput.min = currentTime;
}

function addTask() {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (title !== "" && description !== "" && date !== "" && time !== "") {
        const currentDateTime = new Date();
        const selectedDateTime = new Date(`${date}T${time}`);
        
        if (selectedDateTime > currentDateTime) {
            const taskItem = document.createElement("li");
            taskItem.className = "list-group-item d-flex justify-content-between align-items-center";
            taskItem.innerHTML = `<span><strong>${title}</strong> <br> ${description} <br> <em>${date} ${time}</em></span>
                                  <span>
                                      <button class="btn btn-sm btn-success" onclick="completeTask(this)">Complete</button>
                                      <button class="btn btn-sm btn-danger" onclick="deleteTask(this)">Delete</button>
                                  </span>`;
        
            document.getElementById("pending-tasks").appendChild(taskItem);
            
            checkEmptyList('pending-tasks');
        
            document.getElementById("title").value = "";
            document.getElementById("description").value = "";
            document.getElementById("date").value = "";
            document.getElementById("time").value = "";
            document.getElementById("error-message").textContent = "";
        } else {
            document.getElementById("error-message").textContent = "Please select a future date and time.";
        }
    }
}

function completeTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.classList.toggle("completed");
    if (taskItem.classList.contains("completed")) {
        document.getElementById("completed-tasks").appendChild(taskItem);
        button.textContent = "Undo";
        checkEmptyList('pending-tasks');
        checkEmptyList('completed-tasks');
    } else {
        document.getElementById("pending-tasks").appendChild(taskItem);
        button.textContent = "Complete";
        checkEmptyList('pending-tasks');
        checkEmptyList('completed-tasks');
    }
}

function deleteTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.remove();
    checkEmptyList('pending-tasks');
    checkEmptyList('completed-tasks');
}

function checkEmptyList(listId) {
    const list = document.getElementById(listId);
    if (list.children.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "list-group-item d-flex justify-content-between align-items-center";
        emptyItem.innerHTML = (listId === 'pending-tasks') 
            ? 'No pending tasks <span><button class="btn btn-sm btn-success" disabled>Complete</button><button class="btn btn-sm btn-danger" disabled>Delete</button></span>'
            : 'No completed tasks <span><button class="btn btn-sm btn-success" disabled>Undo</button><button class="btn btn-sm btn-danger" disabled>Delete</button></span>';
        list.appendChild(emptyItem);
    } else {
        const emptyText = (listId === 'pending-tasks') ? "No pending tasks" : "No completed tasks";
        const emptyItem = Array.from(list.children).find(child => child.textContent.includes(emptyText));
        if (emptyItem) {
            emptyItem.remove();
        }
    }
}
