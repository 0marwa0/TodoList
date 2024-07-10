var tasks = [];
var count = 0;
var deleteId = null;
// get access to the add button
var addBtn = document.getElementById("addTaskButton");

// attach an event to the add button
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
function showTasks() {
  var taskList = document.getElementById("taskList");
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
      const tashModal = new bootstrap.Modal(
        document.getElementById("exampleModal-delete")
      );
      tashModal.show();
      deleteId = item.id;
    });
    editIcon.addEventListener("click", () => {
      const editModal = new bootstrap.Modal(
        document.getElementById("exampleModal")
      );
      editModal.show();
    });
  });
}

function deleteTask(id) {
  tasks = tasks.filter((task) => {
    //return only the tasks that its id is not equal to this id
    // if you see this id kick it out of the array
    return task.id != id;
  });
  console.log(tasks, deleteId);
  showTasks();
}

const deletebtn = document.getElementById("confirmDeleteButton");
deletebtn.addEventListener("click", () => {
  deleteTask(deleteId);

  var trashModal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal-delete")
  );
  trashModal.hide();
});
