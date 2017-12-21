if(localStorage.getItem("tasks") === null){
  localStorage.tasks = JSON.stringify([]);
}

if(localStorage.getItem("idNo") === null){
  localStorage.idNo = JSON.stringify(0);
}


function updateHTML () {
  output = [];
  completed = [];
  notcompleted = [];
  /* create <div> for each task */
  (JSON.parse(localStorage.tasks)).forEach(function(task,i){
    if (task.completed == true) {
      completed.push(
        `<div id="task${task.id}"><div class="delete"></div><li class="tasks completedtrue">${task.name} - completed</li></div>`
      );
    } else {
      notcompleted.push(
        `<div id="task${task.id}"><div class="delete"></div><li class="tasks completedfalse">${task.name} - notcompleted</li></div>`
      );
    }
  });
  /* not completed tasks first */
  notcompleted.forEach(function(task){
    output.push(task);
  });
  completed.forEach(function(task){
    output.push(task);
  });
  taskContainer.innerHTML = output.join("");

  /* delete on remove button click */
  tasks = taskContainer.querySelectorAll('.delete');
  for(var i=0; i<tasks.length; i++){
    tasks[i].addEventListener('click', function(){
      removeTask(this.parentNode.id.replace("task", ""));
      updateHTML();
    });
  }
  /* change status when item clicked */
  tasks = taskContainer.querySelectorAll('.tasks');
  for(var i=0; i<tasks.length; i++){
    tasks[i].addEventListener('click', function(){
      changeStatus(this.parentNode.id.replace("task", ""));
      updateHTML();
    });
  }
}

function addTask (taskname) {
  task = {};
  task.name = taskname;
  task.completed = false;
  task.id = JSON.parse(localStorage.idNo);
  localList = JSON.parse(localStorage.tasks);
  localList.push(task);
  localStorage.tasks = JSON.stringify(localList);
  localStorage.idNo = JSON.stringify(JSON.parse(localStorage.idNo)+1);
}

function removeTask (taskid) {
  localList = JSON.parse(localStorage.tasks);
  localList.forEach(function(task, i) {
    if(task.id == taskid){
      localList.splice(i,1);
    }
  });
  localStorage.tasks = JSON.stringify(localList);
}

function changeStatus(taskid) {
  localList = JSON.parse(localStorage.tasks);
  localList.forEach(function(task, i) {
    if(task.id == taskid){
      task.completed = !task.completed;
    }
  });
  localStorage.tasks = JSON.stringify(localList);
}

submitButton = document.getElementById('submit');
inputField = document.getElementById("input");
taskContainer = document.getElementById("tasks");

updateHTML();

setInterval(function() {
  if(inputField.value == ""){
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}, 10);

submitButton.addEventListener("click", function() {
  addTask(inputField.value);
  updateHTML();
});
