const btnAdd = document.getElementById("btn-add");
const tasksBox = document.getElementById("tasks-box");
const input = document.getElementById("input");

btnAdd.addEventListener("click", function () {
    if (input.value.trim() === '') return;

    let newTask = document.createElement("div");
    let newTaskText = document.createElement("p");
    let btnComplete = document.createElement("button");
    let btnDelete = document.createElement("button");

    newTask.classList.add("task-item");
    newTaskText.textContent = input.value;

    btnComplete.innerHTML = '<i class="fa-solid fa-check"></i>';
    btnComplete.classList.add("btn-complete");

    btnDelete.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    btnDelete.classList.add("btn-delete");

    btnComplete.addEventListener("click", function () {
        newTaskText.classList.toggle("completed");
    });
    

    btnDelete.addEventListener("click", function () {
        newTask.remove();
        if (tasksBox.children.length === 0) {
            tasksBox.style.display = "none";
        }
    });

    newTask.appendChild(newTaskText);
    newTask.appendChild(btnComplete);
    newTask.appendChild(btnDelete);
    tasksBox.appendChild(newTask);

    tasksBox.style.display = "flex";

    input.value = '';
});


