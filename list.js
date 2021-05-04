var addButton = document.getElementById("addBtn");
var clearBtn = document.getElementById("clear");
var ul = document.getElementById("list_items");
var doneButton = document.getElementsByClassName("complete");

addButton.addEventListener("click", (e) => {
    fetch("http://todo-backend-sinatra.herokuapp.com/todos", {
            method: "POST",
            body: JSON.stringify({ title: `${input_field.value}` }),
            headers: { "content-type": "application/json" }
        })
        .then(response => response.json())
        .then(json => console.log(json));
    var li = document.createElement("li");
    li.innerHTML = `<p>${input_field.value}</p><button class="complete">Done</button><button class="close">Delete</button>`;
    ul.appendChild(li);
    input_field.value = "";
    var deleteButton = document.getElementsByClassName("close");
});


ul.addEventListener("click", (e) => {
    if (e.target.className === `close`) {
        console.log(e.target.dataset);
        fetch(e.target.dataset.url, { method: "DELETE" })
            .then(() => ul.removeChild(e.target.parentElement))
            .catch(error => console.log("oopsy", error))
    } else if (e.target.className === "complete") {
        console.log(e.target.dataset.url);
        fetch(e.target.dataset.url, {
                method: "PUT",
                body: JSON.stringify({ completed: true }),
                headers: { "content-type": "application/json" }
            })
            .then(response => console.log(response))
            .then(() => e.target.previousElementSibling.innerHTML.strike())
            .catch(error => alert("oopsy", error))
    }
});

fetch('http://todo-backend-sinatra.herokuapp.com/todos', { method: "GET" })
    .then(response => response.json())
    .then(data => generateHTML(data))

function generateHTML(data) {
    console.log(data);
    const html = data.map(item => {
        var li = document.createElement("li");
        li.innerHTML = `<p>${item.title}</p><button data-url="${item.url}" class="complete">Done</button><button data-url="${item.url}" class="close">Delete</button>`;
        ul.appendChild(li);
        input_field.value = "";
        var deleteButton = document.getElementsByClassName("close");
    }).join("");
}

clearBtn.addEventListener("click", () => {
    document.getElementById("list_items").textContent = "";
});