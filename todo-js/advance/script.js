let inpTask = document.getElementById("inpTask");
let listTasks = document.getElementById("listTask");
let btnAdd = document.getElementById("btnAdd");
let btnClear = document.getElementById("btnClear");

let task = [];

function saveTaskList() {
  localStorage.setItem("task", JSON.stringify(task));
}

function retriveList() {
  let retriveTask = localStorage.getItem("task");
  if (retriveTask) {
    task = JSON.parse(retriveTask);
  }
}

function renderTaskList() {
  listTasks.innerHTML = "";
  for (let i = 0; i < task.length; i++) {
    let li = document.createElement("li");
    li.innerText = task[i];
    listTasks.appendChild(li);
  }
}

function addTask() {
  let taskName = inpTask.value;
  if(taskName !== "") {
    task.push(taskName);
    renderTaskList();
    saveTaskList();
    inpTask.value = "";
  } else {
    alert("Please enter a task name");
  }  
}

function clearTaskList() {
  task = [];
  renderTaskList();
  saveTaskList();
}

btnAdd.onclick = function () {
  addTask();
};

btnClear.onclick = function () {
  clearTaskList();
}

inpTask.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

retriveList();
renderTaskList();