var addButton = document.getElementById("addBtn");
var clearBtn = document.getElementById("clear");
var ul = document.getElementById("list_items");

addButton.addEventListener("click", () => {
    if (input_field.value === "") {
        alert("Oopsy! Cannot add an empty item to the list");
    } else {
        if (ul.lastChild === "" || ul.lastChild === null) {
            createLi(0);
        } else {
            console.log(ul.lastChild);
            console.log(ul.lastChild.dataset.order);
            createLi(parseInt(ul.lastChild.dataset.order) + 1);
        }
    }
});

ul.addEventListener("click", (e) => {
    console.log(e.target);
    console.log(e.target.dataset);
    if (e.target.dataset === null || e.target.dataset === "") {
        alert("Oopsy! Unexpected error.");
    } else {
        if (e.target.className === `close`) {
            fetch(e.target.dataset.url, { method: "DELETE" })
                .then((response) => {
                    console.log(response);
                    ul.removeChild(e.target.parentElement);
                })
                .catch(error => alert("oopsy", error))
        } else if (e.target.className === "complete") {
            console.log(e.target.dataset.completed);
            if (e.target.dataset.completed === "false") {
                console.log("1");
                fetch(e.target.dataset.url, {
                        method: "PATCH",
                        body: JSON.stringify({ completed: true }),
                        headers: { "content-type": "application/json" }
                    })
                    .then((response) => {
                        console.log(response);
                        e.target.previousElementSibling.style.textDecoration = "line-through";
                        e.target.dataset.completed = "true"
                    })
                    .catch(error => alert("oopsy", error))
            } else {
                console.log("2");
                fetch(e.target.dataset.url, {
                        method: "PATCH",
                        body: JSON.stringify({ completed: false }),
                        headers: { "content-type": "application/json" }
                    })
                    .then((response) => {
                        console.log(response);
                        e.target.dataset.completed = "false";
                        e.target.previousElementSibling.style.textDecoration = "none";
                    })
                    .catch(error => alert("oopsy", error))
            }
        }
    }
});

fetch('https://todo-backend-sinatra.herokuapp.com/todos', { method: "GET" })
    .then(response => response.json())
    .then(data => generateHTML(data))
    .catch((error) => alert("Oopsy", error))
    .finally(() => document.getElementById("load").style.display = "none")

clearBtn.addEventListener("click", () => {
    fetch("https://todo-backend-sinatra.herokuapp.com/todos", { method: "DELETE" })
        .then(() => { return document.getElementById("list_items").textContent = ""; })
});

//functions 

function generateHTML(data) {
    console.log(data);
    const html = data.map(item => {
        var li = document.createElement("li");
        li.setAttribute("data-order", item.order);
        li.innerHTML = `<p>${item.title}</p><button data-completed="${item.completed}" data-url="${item.url}" class="complete">&#x2713;</button><button data-url="${item.url}" class="close">&#x292C;</button>`;
        ul.appendChild(li);
        input_field.value = "";
        console.log(item.completed);
        if (item.completed === true) {
            console.log("my vaue is true");
            li.firstChild.style.textDecoration = "line-through";
        } else {
            console.log("my value is false");
            li.firstChild.style.textDecoration = "none";
        }
    }).join("");
}

function createLi(value) {
    fetch("https://todo-backend-sinatra.herokuapp.com/todos", {
            method: "POST",
            body: JSON.stringify({
                title: `${input_field.value}`,
                completed: false,
                order: value
            }),
            headers: { "content-type": "application/json" }
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            var li = document.createElement("li");
            li.setAttribute("data-order", data.order);
            li.innerHTML = `<p>${data.title}</p><button data-completed="${data.completed}" data-url="${data.url}" class="complete">&#x2713;</button><button data-url="${data.url}" class="close">&#x292C;</button>`;
            ul.appendChild(li);
            input_field.value = "";
            console.log(data.order);
        })
        .catch(error => alert("oopsy", error))
}