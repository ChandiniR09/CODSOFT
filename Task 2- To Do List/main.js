document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
  
    addTaskBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
        taskInput.value = "";
  
        updateLocalStorage();
      }
    });
  
    taskList.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains("delete-btn")) {
        target.parentElement.remove();
        updateLocalStorage();
      } else if (target.classList.contains("edit-btn")) {
        const taskItem = target.parentElement;
        const taskText = taskItem.querySelector(".task-text");
        const newText = prompt("Edit task:", taskText.innerText);
        if (newText !== null && newText.trim() !== "") {
          taskText.innerText = newText;
          updateLocalStorage();
        }
      } else if (target.classList.contains("task-text")) {
        target.classList.toggle("completed");
        updateLocalStorage();
      }
    });
  
    function createTaskItem(taskText) {
      const taskItem = document.createElement("li");
      taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      `;
      return taskItem;
    }
  
    function updateLocalStorage() {
      const tasks = [];
      taskList.querySelectorAll("li").forEach((taskItem) => {
        tasks.push({
          text: taskItem.querySelector(".task-text").innerText,
          completed: taskItem.querySelector(".task-text").classList.contains("completed")
        });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function loadTasksFromLocalStorage() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach((task) => {
        const taskItem = createTaskItem(task.text);
        if (task.completed) {
          taskItem.querySelector(".task-text").classList.add("completed");
        }
        taskList.appendChild(taskItem);
      });
    }
  
    loadTasksFromLocalStorage();
  });
  