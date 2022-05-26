const form = document.getElementById("todo-form");
const autodelete = document.getElementById("autodelete");

form.submit.onclick = e => {
    if (!form.checkValidity()) return;
    e.preventDefault();
    appendTodo();
    form.reset();
};

const appendTodo = () => {
    const ul = document.getElementById("todo_list");
    const li = document.createElement("li");
    const input = document.createElement("input");
    input.onchange = autoremoveChecked;
    input.type = "checkbox";
    input.id = `todo-${ul.childElementCount + 1}`;
    li.appendChild(input);
    const label = document.createElement("label");
    label.htmlFor = input.id;
    label.innerHTML = form.todo.value + ` <button><i class="fas fa-times"></i></button>`;
    label.querySelector("button").onclick = deleteTodo;
    li.appendChild(label);
    ul.prepend(li);
};

const deleteTodo = e => e.target.closest("li").remove();

const autoremoveChecked = e => {
    if (autodelete.checked) {
        setTimeout(() => e.target.closest("li").remove(), 250);
    }
};

window.onload = () => {
    const deleteBtns = document.querySelectorAll("#todo_list li button");
    deleteBtns.forEach(btn => (btn.onclick = deleteTodo));

    document.querySelectorAll('#todo_list input[type="checkbox"]').forEach(input => {
        input.onchange = autoremoveChecked;
    });

    autodelete.onchange = () => {
        if (!autodelete.checked) return;

        document.querySelectorAll('#todo_list input[type="checkbox"]:checked').forEach(input => {
            setTimeout(() => input.closest("li").remove(), 250);
        });
    };
};
