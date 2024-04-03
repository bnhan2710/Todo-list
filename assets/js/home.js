let createBtn = document.querySelector(".button__new");
let Todocontainer = document.querySelector(".todo__item");
let Doingcontainer = document.querySelector(".doing__item");
let Completedcontainer = document.querySelector(".completed__item");
let Blockedcontainer = document.querySelector(".blocked__item");
let Popupcontainer = document.querySelector(".popup__add");
let Popupmain = document.querySelector(".card__add");
let SubmitBtn = document.querySelector(".submit--btn");
let inputCategory = document.querySelector("#Category");
let inputTitle = document.querySelector("#Title");
let inputContent = document.querySelector("#Content");

var Todo = [
    {
        Category: "N",
        Title: "Write SEO article for new product",
        Date: "June 30,2022",
        Content: "siuuuuuuuuuuuuuuuuuuuuu"
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
//Add Task
function addTask() {
    if (inputCategory.value == "") {
        inputCategory.classList.add("error")
            }
    else {
        inputCategory.classList.remove("error")
        inputCategory.classList.add("ok")
    }
    if(inputContent.value == "") {
        inputContent.classList.add("error")
    }
    else {
        inputContent.classList.remove("error")
        inputContent.classList.add("ok")
    }
    if(inputTitle.value == "") {
        inputTitle.classList.add("error")
    }
    else {
        inputTitle.classList.remove("error")
        inputTitle.classList.add("ok")
    }
    if(inputCategory.value != "" && inputContent.value != "" && inputTitle.value != "") {
        let Category = inputCategory.value
        let Title = inputTitle.value
        let Content = inputContent.value
        Todo.push({
            Category : Category,
            Title : Title,
            Content : Content
        })
        localStorage.setItem("Todo", JSON.stringify(Todo))
        render()
        closePopup()
    }
}
localStorage.clear()
function render() {
    let itemTodo = Todo.map((item, index) => {
        return `             
        
        <div class="block__box--item todo__item">
           <div class="box--item">
               <div class="item--title">
                   <p class="title">${item.Category}</p>
                   <div class="edit---delete">
                   <img class="edit" onclick = "OnEdit(${index})" src="./assets/icon/pen.svg" alt="">
                   <img class="delete" onclick = "OnDelete(${index})" src="./assets/icon/bin.svg" alt="">
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
                <img class="edit" onclick = "OnEdit(${index})" src="./assets/icon/pen.svg" alt="">
                <img class="delete" onclick = "OnDelete(${index})" src="./assets/icon/bin.svg" alt="">
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
                <img class="edit" onclick = "OnEdit(${index})" src="./assets/icon/pen.svg" alt="">
                <img class="delete" onclick = "OnDelete(${index})" src="./assets/icon/bin.svg" alt="">
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
                <img class="edit" src="./assets/icon/pen.svg" alt="">
                <img class="delete" src="./assets/icon/bin.svg" alt="">
                 </div>
            </div>
            <div class="box__item--desc">
                <p class="desc">${item.Title}</p>
            </div>
            <div class="box__item--detail">
                <p class="detail">${item.Content}</p>
            </div>
            <div class="box__item--datetime">
                <img class="clock" onclick = "OnEdit(${index})" src="./assets/icon/clock.svg" alt=""> 
                <span class="date" onclick = "OnDelete(${index})">June 30,2022</span>
            </div>
        </div>
     </div>`
    })
    Blockedcontainer.innerHTML = itemBlocked.join("");
}
render();
    

