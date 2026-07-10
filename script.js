const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

window.onload = function () {
    loadTasks();
};

function addTask() {

    if(taskInput.value.trim() === ""){
        alert("Please enter a task");
        return;
    }

    createTask(taskInput.value);

    saveTasks();

    taskInput.value="";
}

function createTask(taskText){

    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerText = taskText;

    span.onclick = function(){
        span.classList.toggle("completed");
        saveTasks();
    }

    let buttons = document.createElement("div");
    buttons.className="buttons";

    let editBtn=document.createElement("button");
    editBtn.innerText="Edit";
    editBtn.className="edit";

    editBtn.onclick=function(){

        let newTask=prompt("Edit Task",span.innerText);

        if(newTask!==null && newTask.trim()!==""){
            span.innerText=newTask;
            saveTasks();
        }
    }

    let deleteBtn=document.createElement("button");
    deleteBtn.innerText="Delete";
    deleteBtn.className="delete";

    deleteBtn.onclick=function(){
        li.remove();
        saveTasks();
    }

    buttons.appendChild(editBtn);
    buttons.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttons);

    taskList.appendChild(li);
}

function saveTasks(){

    let tasks=[];

    document.querySelectorAll("#taskList li").forEach(function(item){

        tasks.push({
            text:item.querySelector("span").innerText,
            completed:item.querySelector("span").classList.contains("completed")
        });

    });

    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTasks(){

    let tasks=JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function(task){

        createTask(task.text);

        let lastTask=taskList.lastChild.querySelector("span");

        if(task.completed){
            lastTask.classList.add("completed");
        }

    });

}