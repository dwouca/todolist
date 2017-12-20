if(localStorage.getItem("tasks") === null){
  localStorage.tasks == JSON.stringify([]);
}

function updateHTML () {
  output = [];
  (JSON.parse(localStorage.tasks)).forEach(function(task,i){
    console.log(task.name);
    if (task.completed == true) {
      output.push(
        `<div id="task${i+1} class="tasks" class="completed">${task.name}</div>`
      );
    } else {
      output.push(
        `<div id="task${i+1} class="tasks" class="notcompleted">${task.name}</div>`
      );
    }
  });
  console.log(output);
  taskContainer.innerHTML = output.join("");
}

function addTask (taskname) {
  task = {};
  task.name = taskname;
  task.completed = false;
  localList = JSON.parse(localStorage.tasks);
  localList.push(task);
  localStorage.tasks = JSON.stringify(localList);
}

function removeTask (taskname) {

}

function markAsDone (taskname) {

}

function markAsNotDone (taskname) {

}

submitButton = document.getElementById('submit');
inputField = document.getElementById("input");
taskContainer = document.getElementById("tasks");

updateHTML();

submitButton.addEventListener("click", function() {
  addTask(inputField.value);
  updateHTML();
});
