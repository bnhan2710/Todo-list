let createBtn = document.querySelector(".button__new");
console.log(createBtn);

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
    {
        Category: "A",
        Title: "Write SEO article for new product",
        Date: "June 30,2022",
        Content: "zeze"
    },
    {
        Category: "N",
        Title: "Write SEO article for new product",
        Date: "June 30,2022",
        Content: "zeze"
    },
];

var Doing = [

];
var Completed = [

];
var Blocked = [

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

var Todocontainer = document.querySelector(".todo__item");
var Doingcontainer = document.querySelector(".doing__container");
var Completedcontainer = document.querySelector(".finish__container");
var Blockedcontainer = document.querySelector(".blocked__container");
console.log(Todocontainer);

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
}

render();
    

