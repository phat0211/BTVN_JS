
let students = [];
let editIndex = null;


const form = document.getElementById('student-form');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const classInput = document.getElementById('class');
const tableBody = document.getElementById('student-table-body');
const submitBtn = document.getElementById('submit-btn');
const cancelEditBtn = document.getElementById('cancel-edit');


function renderTable() {
    tableBody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.className}</td>
            <td>
                <button onclick="editStudent(${index})">Sửa</button>
                <button onclick="deleteStudent(${index})">Xoá</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}


form.onsubmit = function(e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const age = ageInput.value.trim();
    const className = classInput.value.trim();
    if (!name || !age || !className) return;
    if (editIndex === null) {
        students.push({ name, age, className });
    } else {
        students[editIndex] = { name, age, className };
        editIndex = null;
        submitBtn.textContent = 'Thêm sinh viên';
        cancelEditBtn.style.display = 'none';
    }
    form.reset();
    renderTable();
};

window.editStudent = function(index) {
    const student = students[index];
    nameInput.value = student.name;
    ageInput.value = student.age;
    classInput.value = student.className;
    editIndex = index;
    submitBtn.textContent = 'Cập nhật';
    cancelEditBtn.style.display = 'inline';
};


window.deleteStudent = function(index) {
    if (confirm('Bạn có chắc muốn xoá sinh viên này?')) {
        students.splice(index, 1);
        renderTable();
        
        if (editIndex === index) {
            form.reset();
            editIndex = null;
            submitBtn.textContent = 'Thêm sinh viên';
            cancelEditBtn.style.display = 'none';
        }
    }
};


cancelEditBtn.onclick = function() {
    form.reset();
    editIndex = null;
    submitBtn.textContent = 'Thêm sinh viên';
    cancelEditBtn.style.display = 'none';
};


renderTable();
