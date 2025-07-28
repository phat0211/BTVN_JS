let employees = [];
let currentId = 1;

const form = document.getElementById("employeeForm");
const tableBody = document.querySelector("#employeeTable tbody");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const id = document.getElementById("employeeId").value;
  const name = document.getElementById("name").value.trim();
  const age = parseInt(document.getElementById("age").value);
  const gender = document.querySelector("input[name='gender']:checked")?.value;
  const position = document.getElementById("position").value;
  const note = document.getElementById("note").value.trim();

  if (!name || !age || !gender || !position) return;

  if (id) {
    const index = employees.findIndex(emp => emp.id == id);
    employees[index] = { id: Number(id), name, age, gender, position, note };
  } else {
    employees.push({ id: Date.now(), name, age, gender, position, note });
  }

  renderTable();
  form.reset();
  document.getElementById("employeeId").value = "";
});

function renderTable() {
  tableBody.innerHTML = "";
  employees.forEach((emp, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${emp.id}</td>
      <td>${emp.name}</td>
      <td>${emp.age}</td>
      <td>${emp.gender}</td>
      <td>${emp.position}</td>
      <td>${emp.note}</td>
      <td class="actions">
        <button onclick="editEmployee(${emp.id})">Sửa</button>
        <button onclick="deleteEmployee(${emp.id})">Xoá</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  document.getElementById("employeeId").value = emp.id;
  document.getElementById("name").value = emp.name;
  document.getElementById("age").value = emp.age;
  document.querySelector(`input[name="gender"][value="${emp.gender}"]`).checked = true;
  document.getElementById("position").value = emp.position;
  document.getElementById("note").value = emp.note;
}

function deleteEmployee(id) {
  const confirmDelete = confirm("Bạn có chắc chắn muốn xoá nhân viên này?");
  if (!confirmDelete) return;

  employees = employees.filter(emp => emp.id !== id);
  renderTable();
}
