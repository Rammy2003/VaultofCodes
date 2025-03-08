document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput").value.trim();
    let dueDateTimeInput = document.getElementById("dueDateTime").value;
    let repeatOption = document.getElementById("repeatOption").value;

    if (taskInput === "" || dueDateTimeInput === "") return;

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");

    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" onchange="toggleComplete(this)">
        <span class="task-text">
            <span class="task-main">${taskInput}</span>
            <small>Reminder: ${formatShortDateTime(dueDateTimeInput)} | ${repeatOption}</small>
        </span>
        <button class="edit-btn" onclick="editTask(this)">Edit</button>
        <button class="delete-btn" onclick="removeTask(this)">X</button>
    `;

    taskList.appendChild(li);
    saveTasks();
    updateProgress();
}

/* Checkbox Controls Completion */
function toggleComplete(checkbox) {
    let task = checkbox.nextElementSibling;
    
    if (checkbox.checked) {
        task.classList.add("completed");
    } else {
        task.classList.remove("completed");
    }
    saveTasks();
    updateProgress();
}

/* Edit Task */
function editTask(button) {
    let taskItem = button.parentElement;
    let taskTextSpan = taskItem.querySelector(".task-text");
    let taskMain = taskTextSpan.querySelector(".task-main");

    if (button.textContent === "Edit") {
        let input = document.createElement("input");
        input.type = "text";
        input.value = taskMain.textContent;
        input.className = "edit-input";
        taskTextSpan.replaceChild(input, taskMain);
        button.textContent = "Save";
    } else {
        let input = taskTextSpan.querySelector(".edit-input");
        let newText = input.value;
        let newTaskMain = document.createElement("span");
        newTaskMain.className = "task-main";
        newTaskMain.textContent = newText;
        taskTextSpan.replaceChild(newTaskMain, input);
        button.textContent = "Edit";
    }
    saveTasks();
}

/* Remove Task */
function removeTask(btn) {
    let li = btn.parentElement;
    li.parentElement.removeChild(li);
    saveTasks();
    updateProgress();
}

/* Format Reminder to "Fri Mar 7 05:30 PM" */
function formatShortDateTime(dateTime) {
    let date = new Date(dateTime);
    let day = date.toLocaleDateString("en-US", { weekday: "short" });
    let month = date.toLocaleDateString("en-US", { month: "short" });
    let dateNum = date.getDate();
    let hours = date.getHours() % 12 || 12;
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let amPm = date.getHours() >= 12 ? "PM" : "AM";
    return `${day} ${month} ${dateNum} ${hours}:${minutes} ${amPm}`;
}

/* Update Progress Bar */
function updateProgress() {
    let totalTasks = document.querySelectorAll("#taskList li").length;
    let completedTasks = document.querySelectorAll("#taskList .completed").length;
    let progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    document.getElementById("progress").style.width = progress + "%";
    document.getElementById("progress-text").innerText = Math.round(progress) + "%";
}

/* Validate Date */
function validateDate() {
    let dueDateTimeInput = document.getElementById("dueDateTime");
    let warning = document.getElementById("dateWarning");
    let selectedDate = new Date(dueDateTimeInput.value);
    let now = new Date();
    if (selectedDate < now) {
        warning.textContent = "⚠ Selected date/time is expired!";
        dueDateTimeInput.value = "";
    } else {
        warning.textContent = "";
    }
}
/* Search Tasks */
function searchTasks() {
    let searchText = document.getElementById("search").value.toLowerCase();
    let tasks = document.querySelectorAll("#taskList li");
    let found = false;
    tasks.forEach(task => {
        // Check entire text content of the task
        let text = task.textContent.toLowerCase();
        if (text.includes(searchText)) {
            task.style.display = "flex";
            found = true;
        } else {
            task.style.display = "none";
        }
    });
    // If no tasks are found and searchText is not empty, display a "No tasks found" message
    let taskList = document.getElementById("taskList");
    let noTaskMsg = document.getElementById("no-task-msg");
    if (!found && searchText.trim() !== "") {
        if (!noTaskMsg) {
            noTaskMsg = document.createElement("li");
            noTaskMsg.id = "no-task-msg";
            noTaskMsg.textContent = "No tasks found.";
            noTaskMsg.style.color = "#333";
            noTaskMsg.style.background = "#f2f2f2";
            noTaskMsg.style.padding = "10px";
            noTaskMsg.style.borderRadius = "5px";
            taskList.appendChild(noTaskMsg);
        }
    } else {
        if (noTaskMsg) {
            noTaskMsg.remove();
        }
    }
}

/* Persistence functions (optional) */
function saveTasks() {
    // Implement localStorage saving if desired.
}

function loadTasks() {
    // Implement localStorage loading if desired.
}
