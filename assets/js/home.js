let createBtn = document.querySelector(".button__new");
let Todocontainer = document.querySelector(".todo__item");
let Doingcontainer = document.querySelector(".doing__item");
let Completedcontainer = document.querySelector(".completed__item");
let Blockedcontainer = document.querySelector(".blocked__item");
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
let tickTodo = document.querySelector("#tick--todo");
let tickDoing = document.querySelector("#tick--doing");
let tickFinish = document.querySelector("#tick--finish");
let tickBlocked = document.querySelector("#tick--blocked");


var Todo = [
    {
        Category: "N",
        Title: "Write SEO article for new product",
        Date: "June 30,2022",
        Content: "siuuuuu"
    },
    {
        Category: "H",
        Title: "Write SEO article for new product",
        Date: "June 30,2022",
        Content: "hellooooooo"
    },
];

var Doing = [
    {
        Category: "N",
        Title: "Write SEO article for new product",
        Content: "zeze"
    },
    {
        Category: "N",
        Title: "Write SEO article for new product",
        Content: "zeze"
    },

];
var Completed = [
    {
        Category: "N",
        Title: "Write SEO article for new product",
        Content: "zeze"
    },

];
var Blocked = [
    {
        Category: "N",
        Title: "Write SEO article for new product",
        Content: "zeze"
    },

];

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

// console.log(Todocontainer);
// console.log(Doingcontainer);
// console.log(Completedcontainer);
// console.log(Blockedcontainer);
// Render
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
}
//Close Edit
function closeEdit() {
    Editcontainer.classList.toggle('active__popup')
    inputEditCategory.classList.remove("error")
    inputEditContent.classList.remove("error")
    inputEditTitle.classList.remove("error")
}
//Add Task
function addTask() {
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
        Todo.push({
            Category : CategoryValue,
            Title : TitleValue,
            Content : ContentValue,
        })
        localStorage.setItem("Todo", JSON.stringify(Todo))
        render()
        closePopup()
    }
}
//Delete
function OnDelete(index,obj){
    let Arr = window[obj];
    Arr.splice(index,1);
    // console.log('DELETE DI')
    localStorage.setItem("Todo", JSON.stringify(Todo))
    localStorage.setItem("Doing", JSON.stringify(Doing))
    localStorage.setItem("Completed", JSON.stringify(Completed))
    localStorage.setItem("Blocked", JSON.stringify(Blocked))
    render();
}

//Edit
function OnEdit(index,obj){
    let Arr = window[obj];
    let item = Arr[index];
    console.log(item.Category);

    Editcontainer.classList.toggle('active__popup');
    inputEditCategory.value = item.Category;
    inputEditTitle.value = item.Title;
    inputEditContent.value = item.Content;

    EditBtn.addEventListener('click', function () {
        inputEditCategory.classList.remove("error");
        inputEditContent.classList.remove("error");
        inputEditTitle.classList.remove("error");

        if(inputEditCategory.value === ""){
            inputEditCategory.classList.add("error");
        }
        if(inputEditContent.value === ""){
            inputEditContent.classList.add("error");
        }
        if(inputEditTitle.value === ""){
            inputEditTitle.classList.add("error");
        }
        if(inputEditCategory.value !== "" && inputEditContent.value !== "" && inputEditTitle.value !== "") {
            item.Category = inputEditCategory.value;
            item.Title = inputEditTitle.value;
            item.Content = inputEditContent.value;
            localStorage.setItem("Todo", JSON.stringify(Todo));
            localStorage.setItem("Doing", JSON.stringify(Doing));
            localStorage.setItem("Completed", JSON.stringify(Completed));
            localStorage.setItem("Blocked", JSON.stringify(Blocked));
            render();
            closeEdit();
        }
    });
}


function render() {
    let itemTodo = Todo.map((item, index) => {
        return `             
        
        <div class="block__box--item todo__item">
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
                   <span class="date">June 30,2022</span>
               </div>
           </div>
        </div>`;
    });
    Todocontainer.innerHTML = itemTodo.join("");
    let itemDoing = Doing.map((item,index) => {
        return `             
        <div class="block__box--item doing__item">
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
                <span class="date">June 30,2022</span>
            </div>
        </div>
     </div>`
    })
    Doingcontainer.innerHTML = itemDoing.join("");
    let itemCompleted = Completed.map((item,index) => {
        return `
        <div class="block__box--item finish__item"></div>   
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
                <span class="date">June 30,2022</span>
            </div>
        </div>`
    })
    Completedcontainer.innerHTML = itemCompleted.join("");
    let itemBlocked = Blocked.map((item,index) =>{
        return `
        <div class="block__box--item blocked__item" ">
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
                <span class="date">June 30,2022</span>
            </div>
        </div>
     </div>`
    })
    Blockedcontainer.innerHTML = itemBlocked.join("");
}
render();
