var addButton = document.getElementById("addBtn");
var clearBtn = document.getElementById("clear");
var ul = document.getElementById("list_items");

addButton.addEventListener("click", () => {
    var li = document.createElement("li");
    li.innerHTML = `<p>${input_field.value}</p><button class="close">Delete</button>`;
    ul.appendChild(li);
    input_field.value = "";
    var deleteButton = document.getElementsByClassName("close");

});

ul.addEventListener("click", (e) => {
    if (e.target.className === `close`) {
        ul.removeChild(e.target.parentElement);
    }
});

clearBtn.addEventListener("click", () => {
    document.getElementById("list_items").textContent = "";
});