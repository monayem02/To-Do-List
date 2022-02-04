let task = document.getElementById("input-task");

let taskList = [];

function loadLocalStorage() {
    if (localStorage.getItem("tasks")) {
        taskList = JSON.parse(localStorage.getItem("tasks")) || [];
        show();
    }
}

loadLocalStorage();

document.getElementById('input-task').addEventListener('keyup',(e)=>{
    if (e.keyCode === 13){
        addToArray();
    }
})

function addToArray(){
    let newTask = {taskName:task.value, checked:false};
    if(task.value !== ""){
        taskList.push(newTask);
        show();
        updateLocalStorage();
    }
}

function show(){
    let task_new ="";
    taskList.forEach(function (items, index){
        document.getElementById("input-task").value = '';
        task_new += `
            <li class="list">
                <input type="checkbox" onclick="lineThrough(${index})" ${items.checked ? 'checked' : ''}>
                    <span class="task">${items.taskName}</span>
                <button class="delete-btn" onclick="removeTask(${index})">X</button>
            </li>
        `;
    });
    document.querySelector("#task-list").innerHTML = task_new;
}


function updateLocalStorage(){
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function removeTask(index){
    taskList.splice(index,1);
    updateLocalStorage();
    show();
    return this.parentNode.remove();
}


function lineThrough(index){
    taskList[index].checked = !taskList[index].checked;
    updateLocalStorage();
    show();
}



