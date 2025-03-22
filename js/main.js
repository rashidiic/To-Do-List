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

  newTask.appendChild(newTaskText);
  newTask.appendChild(btnComplete);
  newTask.appendChild(btnDelete);

  tasksBox.appendChild(newTask);

  tasksBox.style.display = "flex";
}

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