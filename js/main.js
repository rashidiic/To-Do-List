const btnAdd = document.getElementById("btn-add");
const tasksBox = document.getElementById("tasks-box");
const input = document.getElementById("input");

function addTaskToDOM(taskText, isCompleted = false) {
  let newTask = document.createElement("div");
  newTask.classList.add("task-item");

  let newTaskText = document.createElement("p");
  newTaskText.textContent = taskText;

  if (isCompleted) {
    newTaskText.classList.add("completed");
  }

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
    newTaskText.classList.toggle("completed");
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

// ##############################################################

let searchBox = document.getElementById("search-box");
let btnSearch = document.getElementById("btn-search");

btnSearch.addEventListener("click", function () {
  // if(searchBox.style.display === "none"){
  //   searchBox.style.display = "flex";
  // } else {
  //   searchBox.style.display = "none";
  // }
  searchBox.classList.toggle("active");
});

// ##############################################################

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

btnAdd.addEventListener("click", function () {
  const taskText = input.value.trim();

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  addTaskToDOM(taskText);

  saveTasksToLocalStorage();

  input.value = '';
});

window.addEventListener('load', loadTasksFromLocalStorage);