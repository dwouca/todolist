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
  (JSON.parse(localStorage.tasks)).forEach(function(task,i){
    if (task.completed == true) {
      completed.push(
        `<li id="task${task.id}" class="tasks completedtrue">${task.name} - completed</div>`
      );
    } else {
      notcompleted.push(
        `<li id="task${task.id}" class="tasks completedfalse">${task.name} - notcompleted</div>`
      );
    }
  });
  notcompleted.forEach(function(task){
    output.push(task);
  });
  completed.forEach(function(task){
    output.push(task);
  });
  taskContainer.innerHTML = output.join("");
  /*Delete on click
  tasks = taskContainer.querySelectorAll('.tasks');
  for(var i=0; i<tasks.length; i++){
    tasks[i].addEventListener('click', function(){
      removeTask(this.id.replace("task", ""));
      updateHTML();
    });
  }*/
  tasks = taskContainer.querySelectorAll('.tasks');
  for(var i=0; i<tasks.length; i++){
    tasks[i].addEventListener('click', function(){
      changeStatus(this.id.replace("task", ""));
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
