// Get elements
const inputBox = document.getElementById("taskinput");
const addBtn = document.querySelector("button");
const taskList = document.getElementById("list");

// Load tasks from local storage when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task when button is clicked
addBtn.addEventListener("click", function () {
    const taskText = inputBox.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        inputBox.value = "";
        saveTasks();
    }
});

// Add task to the list
function addTask(text, isChecked = false) {
    const li = document.createElement("li");
    li.innerText = text;

    if (isChecked) li.classList.add("checked");

    // Toggle checked when clicked
    li.addEventListener("click", function () {
        li.classList.toggle("checked");
        saveTasks();
    });

    // Create WRONG ❌ button
    const wrongBtn = document.createElement("span");
    wrongBtn.innerText = "❌";
    wrongBtn.classList.add("wrong-btn");

    // Delete task on click
    wrongBtn.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent check toggle
        li.remove();
        saveTasks();
    });

    li.appendChild(wrongBtn);
    taskList.appendChild(li);
}

// Save all tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#list li").forEach((li) => {
        const taskText = li.childNodes[0].nodeValue.trim();
        const isChecked = li.classList.contains("checked");
        tasks.push({ text: taskText, checked: isChecked });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTask(task.text, task.checked));
}
