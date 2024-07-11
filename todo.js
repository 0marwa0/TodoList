var tasks = [];
var count = 0;
var deleteId = null;
var editedId = null;
// get access to the add button
var addBtn = document.getElementById("addTaskButton");

addBtn.addEventListener("click", () => {
  // get access to the input filed
  var userInput = document.getElementById("taskInput");
  // check if the input filed value is not empty
  if (userInput.value != "") {
    // if the user input is not empty then call the addTask
    addTask(userInput.value);
    userInput.value = "";
  } else {
    alert("Empty Task!!!");
  }
});

function addTask(task) {
  count++;
  tasks.push({ id: count, text: task });

  showTasks();
}
// showToast("Task added successfully!");

function showTasks() {
  var taskList = document.getElementById("taskList");
  taskList.classList = "list-group mt-4 container";
  taskList.innerHTML = "";
  document.body.appendChild(taskList);
  tasks.forEach((item) => {
    console.log(item, "single task");
    var li = document.createElement("li");
    li.classList = "list-group-item d-flex justify-content-between";
    taskList.appendChild(li);
    var p = document.createElement("p");
    p.textContent = item.text;
    li.appendChild(p);
    var icons = document.createElement("div");
    icons.classList = "icons";
    li.appendChild(icons);
    var trashIcon = document.createElement("img");
    var editIcon = document.createElement("img");
    trashIcon.src = "./trash.svg";
    editIcon.src = "./edit.svg";
    icons.appendChild(trashIcon);
    icons.appendChild(editIcon);
    trashIcon.addEventListener("click", () => {
      var tashModal = new bootstrap.Modal(
        document.getElementById("exampleModal-delete")
      );
      tashModal.show();
      deleteId = item.id;
    });
    editIcon.addEventListener("click", () => {
      var txtval = document.getElementById("editTaskInput");
      txtval.value = item.text;
      editedId = item.id;
      console.log(item, "item that you have just clicked");
      var editModal = new bootstrap.Modal(
        document.getElementById("exampleModal")
      );
      editModal.show();
    });
  });
}
function editTask(ahmedId, ahmedText) {
  var task = tasks.find((item) => item.id == ahmedId);

  console.log(task, "this is inside editTask");
  if (task) {
    task.text = ahmedText;
  }
  showTasks();
  // id of the element that will be edited
  // the new value for element
}

function deleteTask(deleteId) {
  tasks = tasks.filter((task) => {
    //return only the tasks that its id is not equal to this id
    // if you see this id kick it out of the array
    return task.id != deleteId;
  });

  console.log(tasks, deleteId);
  showTasks();
}
var editSave = document.getElementById("saveEditButton");
var updatedTaskInput = document.getElementById("editTaskInput");
editSave.addEventListener("click", () => {
  editTask(editedId, updatedTaskInput.value);
  var trashModal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal")
  );
  trashModal.hide();
});

const deletebtn = document.getElementById("confirmDeleteButton");
deletebtn.addEventListener("click", () => {
  deleteTask(deleteId);
  var trashModal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal-delete")
  );
  trashModal.hide();
});
