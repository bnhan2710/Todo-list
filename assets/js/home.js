let createBtn = document.querySelector(".button__new");
let TodoItems = document.querySelector(".todo__item");
let DoingItems = document.querySelector(".doing__item");
let CompletedItems = document.querySelector(".completed__item");
let BlockedItems = document.querySelector(".blocked__item");
let TodoContainer = document.querySelector("#todo");
let DoingContainer = document.querySelector("#doing");
let CompletedContainer = document.querySelector("#completed");
let BlockedContainer = document.querySelector("#blocked");
let TaskContainers = document.querySelector(".task-content");
let Popupcontainer = document.querySelector(".popup__add");
let Editcontainer = document.querySelector(".popup__edit");
let Editmain = document.querySelector(".card__edit");
let Popupmain = document.querySelector(".card__add");
let SubmitBtn = document.querySelector(".submit--btn");
let inputEditCategory = document.querySelector(".edit--category");
let inputEditTitle = document.querySelector(".edit--title");
let inputEditContent = document.querySelector(".edit--content");
let EditBtn = document.querySelector(".submit--edit");
let inputCategory = document.querySelector("#Category");
let inputTitle = document.querySelector("#Title");
let inputContent = document.querySelector("#Content");
let tickTodoEdit = document.querySelector("#tick--todo");
let tickDoingEdit = document.querySelector("#tick--doing");
let tickFinishEdit = document.querySelector("#tick--finish");
let tickBlockedEdit = document.querySelector("#tick--blocked");
let CountTodo = document.querySelector(".count__todo");
let CountDoing = document.querySelector(".count__doing");
let CountCompleted = document.querySelector(".count__completed");
let CountBlocked = document.querySelector(".count__blocked");
let currentDate = new Date();
let day = currentDate.getDate();
let Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let monthIndex = currentDate.getMonth() + 1;
let month = Month[monthIndex - 1];
let year = currentDate.getFullYear();
var Todo = [];
var Doing = [];
var Completed = [];
var Blocked = [];
if (localStorage.getItem("Todo")) {
    Todo = JSON.parse(localStorage.getItem("Todo"));
}

if (localStorage.getItem("Doing")) {
    Doing = JSON.parse(localStorage.getItem("Doing"));
}

if (localStorage.getItem("Completed")) {
    Completed = JSON.parse(localStorage.getItem("Completed"));
}

if (localStorage.getItem("Blocked")) {
    Blocked = JSON.parse(localStorage.getItem("Blocked"));
}
//Open Popup
createBtn.addEventListener('click', function () {
    Popupcontainer.classList.toggle('active__popup')
})

//Prevent Popup
Popupmain.addEventListener('click', function (event) {
    event.stopPropagation()
})
Popupcontainer.addEventListener('click', function() {
    Popupcontainer.classList.toggle('active__popup')
})
Editmain.addEventListener('click', function(event) {
    event.stopPropagation()
})
Editcontainer.addEventListener('click', function() {
    Editcontainer.classList.toggle('active__popup')
})

//Close Popup
function closePopup() {
    Popupcontainer.classList.toggle('active__popup')
    inputCategory.value = "";
    inputTitle.value = "";
    inputContent.value = "";
    inputCategory.classList.remove("error")
    inputContent.classList.remove("error")
    inputTitle.classList.remove("error")
    inputCategory.classList.remove("ok")
    inputContent.classList.remove("ok")
    inputTitle.classList.remove("ok")
}

//Close Edit
function closeEdit() {
    Editcontainer.classList.remove('active__popup')
    inputEditCategory.classList.remove("error")
    inputEditContent.classList.remove("error")
    inputEditTitle.classList.remove("error")
    inputEditCategory.classList.remove("ok");
    inputEditContent.classList.remove("ok");
    inputEditTitle.classList.remove("ok");
    EditBtn.classList.remove('move1','move2','move3','move4')
}
//check input
inputCategory.oninput = function(e){
    if(e.target.value !=""){
        inputCategory.classList.add("ok")
    }
    else inputCategory.classList.remove("ok")
}
inputContent.oninput = (e)=>{
    if(e.target.value!=""){
        inputContent.classList.add("ok")
    }
    else inputContent.classList.remove("ok")
}
inputTitle.oninput = (e) =>{
    if(e.target.value!=""){
        inputTitle.classList.add("ok")
    }
    else inputTitle.classList.remove("ok")
}
//Add Task
function addTask() {
    inputCategory.classList.remove("error")
    inputContent.classList.remove("error")
    inputTitle.classList.remove("error")  
    if (inputCategory.value == "") {
        inputCategory.classList.add("error")
    }
    if(inputContent.value == "") {
        inputContent.classList.add("error")
    }
    if(inputTitle.value == "") {
        inputTitle.classList.add("error")
    }
    
    if(inputCategory.value != "" && inputContent.value != "" && inputTitle.value != "") {
        let CategoryValue = inputCategory.value
        let TitleValue = inputTitle.value
        let ContentValue = inputContent.value
        let datetime =  month + ", " + "" + day + " ," + "" + year
        Todo.push({
            Category : CategoryValue,
            Title : TitleValue,
            Content : ContentValue,    
            Date : datetime,
        })     
        localStorage.setItem("Todo", JSON.stringify(Todo))
        render()
        inputCategory.classList.remove("error")
        inputContent.classList.remove("error")
        inputTitle.classList.remove("error")
        closePopup()
    }
}

//Delete
function OnDelete(index,obj){
    let Arr = window[obj];
    Arr.splice(index,1);
    localStorage.setItem("Todo", JSON.stringify(Todo))
    localStorage.setItem("Doing", JSON.stringify(Doing))
    localStorage.setItem("Completed", JSON.stringify(Completed))
    localStorage.setItem("Blocked", JSON.stringify(Blocked))
    render();
}
//Edit
function OnEdit(index, obj) {
    let Arr = window[obj];
    let item = Arr[index]; 
    Editcontainer.classList.toggle('active__popup');
    inputEditCategory.value = item.Category;
    inputEditTitle.value = item.Title;
    inputEditContent.value = item.Content;
    
    if (window[obj] === Todo) {
        tickTodoEdit.checked = true;
        tickDoingEdit.checked = false;
        tickFinishEdit.checked = false;
        tickBlockedEdit.checked = false;
    } else if (window[obj] === Doing) {
        tickTodoEdit.checked = false;
        tickFinishEdit.checked = false;
        tickBlockedEdit.checked = false;
        tickDoingEdit.checked = true;
    } else if (window[obj] === Completed) {
        tickFinishEdit.checked = true;
        tickDoingEdit.checked = false;
        tickTodoEdit.checked = false;
        tickBlockedEdit.checked = false;
    } else if (window[obj] === Blocked) {
        tickBlockedEdit.checked = true;
        tickDoingEdit.checked = false;
        tickTodoEdit.checked = false;
        tickFinishEdit.checked = false;
    }

    EditBtn.addEventListener('click', function () {
        inputEditCategory.classList.remove("error");
        inputEditContent.classList.remove("error");
        inputEditTitle.classList.remove("error");
        inputEditCategory.classList.remove("ok");
        inputEditContent.classList.remove("ok");
        inputEditTitle.classList.remove("ok");
        if (inputEditCategory.value === "") {
            inputEditCategory.classList.add("error");
        }
        else if (inputEditCategory.value !== "") {
            inputEditCategory.classList.add("ok");
        }
        if (inputEditContent.value === "") {
            inputEditContent.classList.add("error");
        }
        else if (inputEditContent.value !== "") {
            inputEditContent.classList.add("ok");
        }
        if (inputEditTitle.value === "") {
            inputEditTitle.classList.add("error");
        }
        else if (inputEditTitle.value !== "") {
            inputEditTitle.classList.add("ok");
        }

        if (inputEditCategory.value !== "" && inputEditContent.value !== "" && inputEditTitle.value !== "") {
            if(tickTodoEdit.checked == true) {
                MoveTask(index, obj, "Todo");
            }
            else if(tickDoingEdit.checked == true) {
                MoveTask(index, obj, "Doing");
            }
            else if(tickFinishEdit.checked == true) {
                MoveTask(index, obj, "Completed");
            }
            else if(tickBlockedEdit.checked == true) {
                MoveTask(index, obj, "Blocked");
            }
            item.Category = inputEditCategory.value;
            item.Title = inputEditTitle.value;
            item.Content = inputEditContent.value;
            localStorage.setItem("Todo", JSON.stringify(Todo));
            localStorage.setItem("Doing", JSON.stringify(Doing));
            localStorage.setItem("Completed", JSON.stringify(Completed));
            localStorage.setItem("Blocked", JSON.stringify(Blocked));
            EditBtn.classList.remove('move1','move2','move3','move4');
            render();
            closeEdit();
        }
    });
}

// Move Task
function MoveTask(index, source, target) {
    let sourceArray = window[source];
    let targetArray = window[target];

    if (sourceArray && targetArray && index >= 0 && index < sourceArray.length) {
        let tasksToMove = sourceArray.splice(index);   
        tasksToMove.forEach(task => {
            task.Category = target.charAt(0).toUpperCase();
        });
        targetArray.push(...tasksToMove);
        localStorage.setItem("Todo", JSON.stringify(Todo));
        localStorage.setItem("Doing", JSON.stringify(Doing));
        localStorage.setItem("Completed", JSON.stringify(Completed));
        localStorage.setItem("Blocked", JSON.stringify(Blocked));
        render();
    }
}

//Count Task
function CountTask() {
    CountTodo.innerText = Todo.length;
    CountDoing.innerText = Doing.length;
    CountCompleted.innerText = Completed.length;
    CountBlocked.innerText = Blocked.length;
}
setInterval(CountTask, 30);

// Add Event for check
tickTodoEdit.addEventListener('click', function () {
    if (tickTodoEdit.checked) {
        tickTodoEdit.checked = true;
        EditBtn.classList.remove('move2','move3','move4');
        EditBtn.classList.add('move1');
        tickDoingEdit.checked = false;
        tickFinishEdit.checked = false;
        tickBlockedEdit.checked = false;
    }
})

tickDoingEdit.addEventListener('click', function () {
    if (tickDoingEdit.checked) {
        tickDoingEdit.checked = true;
        EditBtn.classList.remove('move1','move3','move4');
        EditBtn.classList.add('move2');
        tickTodoEdit.checked = false;
        tickFinishEdit.checked = false;
        tickBlockedEdit.checked = false;
    }
})

tickFinishEdit.addEventListener('click', function () {
    if (tickFinishEdit.checked) {
        tickFinishEdit.checked = true;      
        EditBtn.classList.remove('move1', 'move2','move4'); 
        EditBtn.classList.add('move3');
        tickDoingEdit.checked = false;
        tickTodoEdit.checked = false;
        tickBlockedEdit.checked = false;
    }
})

tickBlockedEdit.addEventListener('click', function () {
    if (tickBlockedEdit.checked) {
        tickBlockedEdit.checked = true;
        EditBtn.classList.remove('move1', 'move2', 'move3');
        EditBtn.classList.add('move4');
        tickDoingEdit.checked = false;
        tickFinishEdit.checked = false;
        tickTodoEdit.checked = false;
    }
})

//Render

function render() {
    let itemTodo = Todo.map((item, index) => {
        return `             
        <div class="block__box--item todo__item draggable" draggable="true" onDragStart="DragStart(event,${index},'Todo')">
        <div class="box--item">
               <div class="item--title">
                   <p class="title">${item.Category}</p>
                   <div class="edit---delete">
                   <img class="edit" onclick = "OnEdit(${index},'Todo')" src="./assets/icon/pen.svg" alt="">
                   <img class="delete" onclick = "OnDelete(${index},'Todo')" src="./assets/icon/bin.svg" alt="">
                    </div>
               </div>
               <div class="box__item--desc">
                   <p class="desc">${item.Title}</p>
               </div>
               <div class="box__item--detail">
                   <p class="detail">${item.Content}</p>
               </div>
               <div class="box__item--datetime">
                   <img class="clock" src="./assets/icon/clock.svg" alt=""> 
                   <span class="date">${item.Date}</span>
               </div>
           </div>
        </div>`;
    });
    TodoItems.innerHTML = itemTodo.join("");
    let itemDoing = Doing.map((item,index) => {
        return `             
        <div class="block__box--item doing__item draggable" onDragStart="DragStart(event,${index},'Doing')"  draggable="true">        
        <div class="box--item">
            <div class="item--title">
                <p class="title">${item.Category}</p>
                <div class="edit---delete">
                <img class="edit" onclick = "OnEdit(${index},'Doing')" src="./assets/icon/pen.svg" alt="">
                <img class="delete" onclick = "OnDelete(${index},'Doing')" src="./assets/icon/bin.svg" alt="">
                 </div>
            </div>
            <div class="box__item--desc">
                <p class="desc">${item.Title}</p>
            </div>
            <div class="box__item--detail">
                <p class="detail">${item.Content}</p>
            </div>
            <div class="box__item--datetime">
                <img class="clock" src="./assets/icon/clock.svg" alt=""> 
                <span class="date">${item.Date}</span>
            </div>
        </div>
     </div>`
    })
    DoingItems.innerHTML = itemDoing.join("");
    let itemCompleted = Completed.map((item,index) => {
        return `
        <div class="block__box--item completed__item draggable" draggable="true" onDragStart="DragStart(event,${index},'Completed')" >       
         <div class="box--item">
            <div class="item--title">
                <p class="title">${item.Category}</p>
                <div class="edit---delete">
                <img class="edit" onclick = "OnEdit(${index},'Completed')" src="./assets/icon/pen.svg" alt="">
                <img class="delete" onclick = "OnDelete(${index},'Completed')" src="./assets/icon/bin.svg" alt="">
                 </div>
            </div>
            <div class="box__item--desc">
                <p class="desc">${item.Title}</p>
            </div>
            <div class="box__item--detail">
                <p class="detail">${item.Content}</p>
            </div>
            <div class="box__item--datetime">
                <img class="clock" src="./assets/icon/clock.svg" alt=""> 
                <span class="date">${item.Date}</span>
            </div>
        </div>`
    })
    CompletedItems.innerHTML = itemCompleted.join("");
    let itemBlocked = Blocked.map((item,index) =>{
        return `
        <div class="block__box--item blocked__item draggable"  draggable="true" onDragStart="DragStart(event,${index},'Blocked')">      
          <div class="box--item">
            <div class="item--title">
                <p class="title">${item.Category}</p>
                <div class="edit---delete">
                <img class="edit" onclick = "OnEdit(${index},'Blocked')"  src="./assets/icon/pen.svg" alt="">
                <img class="delete" onclick = "OnDelete(${index},'Blocked')" src="./assets/icon/bin.svg" alt="">
                 </div>
            </div>
            <div class="box__item--desc">
                <p class="desc">${item.Title}</p>
            </div>
            <div class="box__item--detail">
                <p class="detail">${item.Content}</p>
            </div>
            <div class="box__item--datetime">
                <img class="clock" src="./assets/icon/clock.svg" alt=""> 
                <span class="date">${item.Date}</span>
            </div>
        </div>
     </div>`
    })
    BlockedItems.innerHTML = itemBlocked.join("");
    document.dispatchEvent(renderEvent);
}
const renderEvent = new Event('renderUpdated');
render();
let eventDrag = {
    index: null,
    type: null,
    target: null
};

// Drag and Drop
function DragStart(event, index, type) {
    let target = event.target;
    eventDrag.index = index;
    eventDrag.type = type;
    eventDrag.target = {
        Category: target.querySelector(".title").innerText,
        Title: target.querySelector(".desc").innerText,
        Content: target.querySelector(".detail").innerText,
        Date: target.querySelector(".date").innerText
    };
}

function DragOver(event) {
    event.preventDefault();
}

function Drop(event, target) {
    event.preventDefault();
    let sourceType = eventDrag.type;
    let sourceIndex = eventDrag.index;
    let task;

    switch (sourceType) {
        case 'Todo':
            task = Todo.splice(sourceIndex, 1)[0];
            break;
        case 'Doing':
            task = Doing.splice(sourceIndex, 1)[0];
            break;
        case 'Completed':
            task = Completed.splice(sourceIndex, 1)[0];
            break;
        case 'Blocked':
            task = Blocked.splice(sourceIndex, 1)[0];
            break;
        default:
            break;
    }

    switch (target) {
        case 'Todo':
            Todo.push(task);

            break;
        case 'Doing':
            Doing.push(task);

            break;
        case 'Completed':
            Completed.push(task);

            break;
        case 'Blocked':
            Blocked.push(task);

            break;
        default:
            break;
    }
//update local storage
    localStorage.setItem('Todo', JSON.stringify(Todo));
    localStorage.setItem('Doing', JSON.stringify(Doing));
    localStorage.setItem('Completed', JSON.stringify(Completed));
    localStorage.setItem('Blocked', JSON.stringify(Blocked));
    render();
}

TodoContainer.addEventListener('dragover', DragOver);
DoingContainer.addEventListener('dragover', DragOver);
CompletedContainer.addEventListener('dragover', DragOver);
BlockedContainer.addEventListener('dragover', DragOver);

TodoContainer.addEventListener('drop', (event) => Drop(event, 'Todo'));
DoingContainer.addEventListener('drop', (event) => Drop(event, 'Doing'));
CompletedContainer.addEventListener('drop', (event) => Drop(event, 'Completed'));
BlockedContainer.addEventListener('drop', (event) => Drop(event, 'Blocked'));
