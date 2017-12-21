if(localStorage.getItem("tasks") === null){
  localStorage.tasks = JSON.stringify([]);
}

if(localStorage.getItem("idNo") === null){
  localStorage.idNo = JSON.stringify(0);
}


function updateHTML () {
  output = [];
  (JSON.parse(localStorage.tasks)).forEach(function(task,i){
    if (task.completed == true) {
      output.push(
        `<li id="task${task.id}" class="tasks" class="completed">${task.name}</div>`
      );
    } else {
      output.push(
        `<li id="task${task.id}" class="tasks" class="notcompleted">${task.name}</div>`
      );
    }
  });
  taskContainer.innerHTML = output.join("");
  tasks = taskContainer.querySelectorAll('.tasks');
  for(var i=0; i<tasks.length; i++){
    tasks[i].addEventListener('click', function(){
      removeTask(this.id.replace("task", ""));
      updateHTML();
    });
  }
}

function addTask (taskname) {
  task = {};
  task.name = taskname;
  task.completed = false;
  console.log(JSON.parse(localStorage.idNo));
  task.id = JSON.parse(localStorage.idNo);
  localList = JSON.parse(localStorage.tasks);
  localList.push(task);
  localStorage.tasks = JSON.stringify(localList);
  localStorage.idNo = JSON.stringify(JSON.parse(localStorage.idNo)+1);
}

function removeTask (taskid) {
  console.log("rmove");
  localList = JSON.parse(localStorage.tasks);
  localList.forEach(function(task, i) {
    if(task.id == taskid){
      console.log(taskid);
      localList.splice(i,1);
    }
  });
  localStorage.tasks = JSON.stringify(localList);
}

function markAsDone (taskname) {

}

function markAsNotDone (taskname) {

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
