let addBtn = document.getElementById("addBtn");
let clearBtn = document.getElementById("clear");
let ul = document.getElementById("list_items");

addBtn.addEventListener("click", () => {
    let li = document.createElement("li");
    li.innerHTML = `${input_field.value}`;
    let closeBtn = document.createElement("button");
    closeBtn.className = "close";
    closeBtn.innerText = "Delete";
    li.appendChild(closeBtn);
    ul.appendChild(li);
    input_field.value = "";
});


let closeBtn = document.createElement("button");
closeBtn.className = "close";
closeBtn.innerText = "Delete";

li.appendChild(closeBtn);




clearBtn.addEventListener("click", () => {
    document.getElementById("list_items").textContent = "";
});