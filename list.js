var addButton = document.getElementById("addBtn");
var clearBtn = document.getElementById("clear");
var ul = document.getElementById("list_items");

addButton.addEventListener("click", () => {
    var li = document.createElement("li");
    li.innerHTML = `${input_field.value}<button class="close">Delete</button>`;
    ul.appendChild(li);
    input_field.value = "";
    var deleteButton = document.getElementsByClassName("close");
    console.log(deleteButton);
    for (var i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener("click", (e) => {
            e.target.style.visibility = "hidden";
            e.target.parentElement.style.visibility = "hidden";
        });
    }
});

clearBtn.addEventListener("click", () => {
    document.getElementById("list_items").textContent = "";
});