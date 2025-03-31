const btnAdd = document.getElementById("btn-add");
const tasksBox = document.getElementById("tasks-box");
const input = document.getElementById("input");

function addTaskToDOM(taskText, isCompleted = false) {
  let newTask = document.createElement("div");
  newTask.classList.add("task-item");

  let newTaskText = document.createElement("p");
  newTaskText.textContent = taskText;
  newTaskText.classList.add(isCompleted ? "completed" : "active");

  let btnComplete = document.createElement("button");
  btnComplete.innerHTML = '<i class="fa-solid fa-check"></i>';
  btnComplete.classList.add("btn-complete");

  let btnDelete = document.createElement("button");
  btnDelete.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  btnDelete.classList.add("btn-delete");

  let btnEdit = document.createElement("button");
  btnEdit.innerHTML = '<i class="fa-solid fa-pencil"></i>';
  btnEdit.classList.add("btn-edit");

  btnComplete.addEventListener("click", function () {
    if (newTaskText.classList.contains("completed")) {
      newTaskText.classList.remove("completed");
      newTaskText.classList.add("active");
    } else {
      newTaskText.classList.remove("active");
      newTaskText.classList.add("completed");
    }
    saveTasksToLocalStorage();
  });

  btnDelete.addEventListener("click", function () {
    newTask.remove();
    if (tasksBox.children.length === 0) {
      tasksBox.style.display = "none";
    }
    saveTasksToLocalStorage();
  });

  btnEdit.addEventListener("click", function () {
    const input = document.createElement("input");
    input.type = "text";
    input.value = newTaskText.textContent;
    input.classList.add("edit-input");

    newTaskText.replaceWith(input);
    input.focus();

    input.addEventListener("blur", saveEdit);
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") saveEdit();
    });

    function saveEdit() {
      const newText = input.value.trim();
      if (newText !== "") {
        newTaskText.textContent = newText;
      }
      input.replaceWith(newTaskText);
      saveTasksToLocalStorage();
    }
  });

  newTask.appendChild(newTaskText);
  newTask.appendChild(btnEdit);
  newTask.appendChild(btnComplete);
  newTask.appendChild(btnDelete);

  tasksBox.appendChild(newTask);

  tasksBox.style.display = "flex";
}

const btnAll = document.getElementById("btn-all");
const btnActive = document.getElementById("btn-active");
const btnCompleted = document.getElementById("btn-completed");
const btnClear = document.getElementById("btn-clear");
const underline = document.querySelectorAll("underline");
const underlineAll = document.querySelector(".underline.all");
const underlineActive = document.querySelector(".underline.active");
const underlineCompleted = document.querySelector(".underline.completed");
const underlineSearch = document.querySelector(".underline.search");


function filterTasks(filterType) {
  let tasks = document.querySelectorAll(".task-item");

  tasks.forEach(task => {
    const taskText = task.querySelector("p");

    if (filterType === "all") {
      task.style.display = "flex";
    }
    else if (filterType === "active") {
      task.style.display = taskText.classList.contains("completed") ? "none" : "flex";
    }
    else if (filterType === "completed") {
      task.style.display = taskText.classList.contains("completed") ? "flex" : "none";
    }
  });
}

function clearCompletedTasks() {
  let tasks = document.querySelectorAll('.task-item');

  tasks.forEach(task => {
    if (task.querySelector('p').classList.contains("completed")) {
      task.remove();
    }
  });

  saveTasksToLocalStorage();
}

btnAll.addEventListener("click", function () {
  filterTasks("all");
  underlineAll.style.opacity = "1";
  underlineActive.style.opacity = "0";
  underlineCompleted.style.opacity = "0";
  underlineSearch.style.opacity = "0";
});

btnActive.addEventListener("click", function () {
  filterTasks("active");
  underlineActive.style.opacity = "1";
  underlineAll.style.opacity = "0";
  underlineCompleted.style.opacity = "0";
  underlineSearch.style.opacity = "0";
});

btnCompleted.addEventListener("click", function () {
  filterTasks("completed");
  underlineCompleted.style.opacity = "1";
  underlineAll.style.opacity = "0";
  underlineActive.style.opacity = "0";
  underlineSearch.style.opacity = "0";
});

btnClear.addEventListener("click", function () {
  clearCompletedTasks();
});


const searchBox = document.getElementById("search-box");
const btnSearch = document.getElementById("btn-search");

btnSearch.addEventListener("click", function () {
  searchBox.classList.toggle("active");
  underlineSearch.style.opacity = "1";
  underlineAll.style.opacity = "0";
  underlineActive.style.opacity = "0";
  underlineCompleted.style.opacity = "0";
});

function searchTasks() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const tasks = document.querySelectorAll('.task-item');
  let hasResults = false;

  tasks.forEach(task => {
    const taskText = task.querySelector('p').textContent.toLowerCase();
    if (taskText.includes(searchTerm)) {
      task.style.display = 'flex';
      hasResults = true;
    } else {
      task.style.display = 'none';
    }
  });

  const message = document.getElementById("no-tasks-message");
  message.style.display = hasResults ? 'none' : 'block';
}

document.getElementById("search").addEventListener("input", searchTasks);

document.addEventListener("DOMContentLoaded", function () {
  const btnTheme = document.getElementById("btn-theme");
  const body = document.getElementById("body");

  function setTheme(theme) {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      body.classList.add("dark-theme");
      body.classList.remove("light-theme");
      btnTheme.classList.add("checked");
    } else {
      body.classList.add("light-theme");
      body.classList.remove("dark-theme");
      btnTheme.classList.remove("checked");
    }
  }

  btnTheme.addEventListener("click", function () {
    const newTheme = btnTheme.classList.contains("checked") ? "light" : "dark";
    setTheme(newTheme);
  });

  const savedTheme = localStorage.getItem("theme") || "light"; // Если темы нет, ставим "light"
  setTheme(savedTheme);
});


function saveTasksToLocalStorage() {
  const tasks = [];

  document.querySelectorAll('.task-item').forEach(taskElement => {
    const taskText = taskElement.querySelector('p').textContent;
    const isCompleted = taskElement.querySelector('p').classList.contains('completed');
    tasks.push({ text: taskText, completed: isCompleted });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach(task => {
    addTaskToDOM(task.text, task.completed);
  });

  if (tasks.length > 0) {
    tasksBox.style.display = "flex";
  }
}

btnAdd.addEventListener("click", addTask);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

function addTask() {
  const taskText = input.value.trim();

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  addTaskToDOM(taskText);
  saveTasksToLocalStorage();

  input.value = '';
}


window.addEventListener('load', loadTasksFromLocalStorage);