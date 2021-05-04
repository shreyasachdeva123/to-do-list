var addButton = document.getElementById("addBtn");
var clearBtn = document.getElementById("clear");
var ul = document.getElementById("list_items");

addButton.addEventListener("click", (e) => {
    fetch("http://todo-backend-sinatra.herokuapp.com/todos", {
            method: "POST",
            body: JSON.stringify({ title: `${input_field.value}` }),
            headers: { "content-type": "application/json" }
        })
        .then(response => response.json())
        .then(json => console.log(json));
    var li = document.createElement("li");
    li.innerHTML = `<p>${input_field.value}</p><button class="close">Delete</button>`;
    ul.appendChild(li);
    input_field.value = "";
    var deleteButton = document.getElementsByClassName("close");
});

ul.addEventListener("click", (e) => {
    if (e.target.className === `close`) {
        console.log(e.target.dataset);
        fetch(e.target.dataset.url, { method: "DELETE" })
            .then(() => ul.removeChild(e.target.parentElement))
            .catch(error => console.log("OOPSY", error))
    }
});

fetch('http://todo-backend-sinatra.herokuapp.com/todos')
    .then(response => response.json())
    .then(data => generateHTML(data))

function generateHTML(data) {
    console.log(data);
    const html = data.map(list => {
        var li = document.createElement("li");
        li.innerHTML = `<p>${list.title}</p><button data-url="${list.url}" class="close">Delete</button>`;
        ul.appendChild(li);
        input_field.value = "";
        var deleteButton = document.getElementsByClassName("close");
    }).join("");

}

clearBtn.addEventListener("click", () => {
    document.getElementById("list_items").textContent = "";
});