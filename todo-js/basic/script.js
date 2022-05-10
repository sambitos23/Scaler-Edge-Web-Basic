/*
documen -> DOM = Document Object Model
window -> BOM = Browser Object Model
*/

/*
 * when add is clicked,
 * 1. read input with getNewTaskName()
 * 2. save that to "newTaskName"
 * 3. call addItemToList(newTaskName)
 * 4. clear input
 */

let inpTask = document.getElementById("inpTask");
let listTasks = document.getElementById("listTask");

function addItemToList(taskName /*String*/) {
  let newTaskListItem = document.createElement("li"); // new element get created, but it was not in the page
  newTaskListItem.innerText = taskName;
  listTasks.appendChild(newTaskListItem);
}

function getNewTaskName() {
  return inpTask.value;
} /*return String*/

function addTask() {
  let newTaskName = getNewTaskName();
  if (newTaskName !== "") {
    addItemToList(newTaskName);
    inpTask.value = "";
  } else {
    alert("Please enter a task name");
  }
}

/*
 * Future requirements:,
 * 1. When enter button is clicked (cursor is on inpTask) aloso do the same task for add button
 * 2. when input is empty, show an alert message that input cannot be empty
 */

let btnAdd = document.getElementById("btnAdd");
btnAdd.onclick = function () {
  addTask();
};

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
