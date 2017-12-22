if(localStorage.getItem("tasks") === null){
  localStorage.tasks = JSON.stringify([]);
}

if(localStorage.getItem("idNo") === null){
  localStorage.idNo = JSON.stringify(0);
}

if(localStorage.getItem("sortBy") === null){
  localStorage.sortBy = JSON.stringify("chosen"); /* chosen or alph */
}

localStorage.sortBy = JSON.stringify("alph");

function updateHTML () {
  output = [];
  completed = [];
  notcompleted = [];
  /* create <div> for each task */
  if(JSON.parse(localStorage.sortBy) == "chosen"){
    (JSON.parse(localStorage.tasks)).forEach(function(task){
      if (task.completed == true) {
        completed.push(
          `<div id="task${task.id}" class="sortable"><div class="delete"></div><div class="move"></div><li class="tasks completedtrue">${task.name}</li></div>`
        );
      } else {
        notcompleted.push(
          `<div id="task${task.id}" class="sortable"><div class="delete"></div><div class="move"></div><li class="tasks completedfalse">${task.name}</li></div>`
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
  } else if(JSON.parse(localStorage.sortBy) == "alph") {
    alphabeticalSorted = [];
    alphabeticalSorted = (JSON.parse(localStorage.tasks)).sort(function(a,b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      } else {
      return 0;
      }
    })
    console.log(alphabeticalSorted);
    alphabeticalSorted.forEach(function(task){
      output.push(
        `<div id="task${task.id}"><div class="delete"></div><li class="tasks completed${task.completed}">${task.name}</li></div>`
      );
      console.log(task.name);
    });
  };

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

function disableButton() {
  if(inputField.value == ""){
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

function changeOrderVar() {
  if (orderSelect.options[orderSelect.selectedIndex].value == "alph") {
    localStorage.sortBy = JSON.stringify("alph");
  } else if (orderSelect.options[orderSelect.selectedIndex].value == "chosen") {
    localStorage.sortBy = JSON.stringify("chosen");
  }
}

submitButton = document.getElementById('submit');
inputField = document.getElementById("input");
taskContainer = document.getElementById("tasks");
$taskContainer = $("#tasks");
orderSelect = document.getElementById("ordertype");

disableButton();
changeOrderVar();
updateHTML();

orderSelect.onchange = function() {
  changeOrderVar();
  updateHTML();
}

inputField.oninput = function() {
  disableButton();
  updateHTML();
}

submitButton.addEventListener("click", function() {
  addTask(inputField.value);
  updateHTML();
});

$(function() {
    $taskContainer.sortable();
});
