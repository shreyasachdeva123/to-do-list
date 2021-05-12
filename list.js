var addButton = document.getElementById("addBtn");
var clearBtn = document.getElementById("clear");
var ul = document.getElementById("list_items");
var listElements = ul.childNodes;

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
                .then(checkStatus)
                .then((response) => {
                    console.log(response);
                    ul.removeChild(e.target.parentElement);
                })
                .catch(error => alert("oopsy", error))
        } else if (e.target.className === "complete") {
            console.log(e.target.dataset.completed);
            if (e.target.dataset.completed === "false") {
                fetch(e.target.dataset.url, {
                        method: "PATCH",
                        body: JSON.stringify({ completed: true }),
                        headers: { "content-type": "application/json" }
                    })
                    .then(checkStatus)
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
                    .then(checkStatus)
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
    .then(checkStatus)
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
    var sortedData = data.sort(function(a, b) { return parseInt(a.order) - parseInt(b.order) });
    console.log(sortedData);
    const html = sortedData.map(item => {
        var li = document.createElement("li");
        li.setAttribute("data-order", item.order);
        li.setAttribute("contenteditable", true);
        li.innerHTML = `<p>${item.title}</p><button data-completed="${item.completed}" data-url="${item.url}" class="complete">&#x2713;</button><button data-url="${item.url}" class="close">&#x292C;</button>`;
        ul.appendChild(li);
        input_field.value = "";
        li.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                console.log(e.target);
                console.log("Im working");
                fetch(e.target.firstChild.nextElementSibling.dataset.url, {
                        method: "PATCH",
                        body: JSON.stringify({ title: e.target.firstChild.innerHTML }),
                        headers: { "content-type": "application/json" }
                    })
                    .then(checkStatus)
                    .then((response) => console.log(response))
                    .catch((error) => alert("Oopsy", error))
            }
        });
        console.log(item.completed);
        if (item.completed === true) {
            li.firstChild.style.textDecoration = "line-through";
        } else {
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
        .then(checkStatus)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            var li = document.createElement("li");
            li.setAttribute("contenteditable", true);
            li.setAttribute("data-order", data.order);
            li.innerHTML = `<p>${data.title}</p><button data-completed="${data.completed}" data-url="${data.url}" class="complete">&#x2713;</button><button data-url="${data.url}" class="close">&#x292C;</button>`;
            ul.appendChild(li);
            input_field.value = "";
            li.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    console.log(e.target);
                    console.log("Im working");
                    fetch(e.target.firstChild.nextElementSibling.dataset.url, {
                            method: "PATCH",
                            body: JSON.stringify({ title: e.target.firstChild.innerHTML }),
                            headers: { "content-type": "application/json" }
                        })
                        .then(checkStatus)
                        .then((response) => console.log(response))
                        .catch((error) => alert("Oopsy", error))
                }
            });
            console.log(data.order);
        })
        .catch(error => {
            console.log(error);
            alert("oopsy", error)
        })
}

function checkStatus(response) {
    console.log(response);
    if (response.ok === true) {
        return Promise.resolve(response);
    } else {
        Promise.reject(alert(response.statusText));
    }
}

document.querySelector("input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
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
    }
});