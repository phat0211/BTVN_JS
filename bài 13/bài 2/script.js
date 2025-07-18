let todos = [];
let editIndex = null;

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const submitBtn = document.getElementById('submit-btn');
const cancelEditBtn = document.getElementById('cancel-edit');

function renderList() {
    list.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleComplete(${index})">
            <span ondblclick="editTodo(${index})">${todo.text}</span>
            <button onclick="editTodo(${index})">Sửa</button>
            <button onclick="deleteTodo(${index})">Xoá</button>
        `;
        list.appendChild(li);
    });
}

form.onsubmit = function(e) {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    if (editIndex === null) {
        todos.push({ text, completed: false });
    } else {
        todos[editIndex].text = text;
        editIndex = null;
        submitBtn.textContent = 'Thêm công việc';
        cancelEditBtn.style.display = 'none';
    }
    form.reset();
    renderList();
};

window.toggleComplete = function(index) {
    todos[index].completed = !todos[index].completed;
    renderList();
};

window.editTodo = function(index) {
    input.value = todos[index].text;
    editIndex = index;
    submitBtn.textContent = 'Cập nhật';
    cancelEditBtn.style.display = 'inline';
    input.focus();
};

window.deleteTodo = function(index) {
    if (confirm('Bạn có chắc muốn xoá công việc này?')) {
        todos.splice(index, 1);
        renderList();
        if (editIndex === index) {
            form.reset();
            editIndex = null;
            submitBtn.textContent = 'Thêm công việc';
            cancelEditBtn.style.display = 'none';
        }
    }
};

cancelEditBtn.onclick = function() {
    form.reset();
    editIndex = null;
    submitBtn.textContent = 'Thêm công việc';
    cancelEditBtn.style.display = 'none';
};

renderList(); 