// const arr = [1, 2, 3, 4, 5];


// console.log('Các số chẵn:');
// arr.forEach(num => {
//   if (num % 2 === 0) {
//     console.log(num);
//   }
// });


// const doubled = arr.map(num => num * 2);
// console.log('Mảng gấp đôi:', doubled);


// const sum = arr.reduce((acc, num) => acc + num, 0);
// console.log('Tổng các số:', sum);

// const book = {
//   title: '1000 chàng không thể cưỡng lại tôi',
//   author: 'Nguyễn Hồng Tỷ',
//   pages: 250
// };

// console.log('Tiêu đề sách:', book.title);
// console.log('Tác giả:', book.author);




// const student = {
//   info: {
//     name: 'Trần Văn C',
//     age: 18
//   },
//   grades: {
//     math: 9.0,
//     english: 8.7
//   }
// };


// console.log('Điểm toán:', student.grades.math);


// student.info.name = 'Nguyễn Hồng Tỷ';
// console.log('Tên học sinh sau khi sửa:', student.info.name);


// student.info.address = '275 Đường đội cấn, Quận cầu giấy, Hà Nội';
// console.log('Địa chỉ học sinh:', student.info.address);




// const students = [
//   { id: 1, name: 'An', age: 16, gender: 'Nam', scores: [7, 8, 9] },
//   { id: 2, name: 'Bình', age: 17, gender: 'Nam', scores: [6, 6, 5] },
//   { id: 3, name: 'Cúc', age: 16, gender: 'Nữ', scores: [9, 9, 10] },
//   { id: 4, name: 'Dương', age: 18, gender: 'Nữ', scores: [4, 5, 6] },
//   { id: 5, name: 'E', age: 15, gender: 'Nam', scores: [10, 10, 10] }
// ]

// console.log('Tên và tuổi của từng học sinh:');
// students.forEach(s => {
//   console.log(`Tên: ${s.name}, Tuổi: ${s.age}`);
// });


// const studentsWithAvg = students.map(s => ({
//   name: s.name,
//   avgScore: s.scores.reduce((a, b) => a + b, 0) / s.scores.length
// }));
// console.log('Tên và điểm trung bình:', studentsWithAvg);


// const goodStudents = studentsWithAvg.filter(s => s.avgScore >= 8);
// console.log('Học sinh có điểm trung bình >= 8:', goodStudents);


// const firstOlder17 = students.find(s => s.age >= 17);
// console.log('Học sinh đầu tiên có tuổi >= 17:', firstOlder17);


// const hasLowAvg = studentsWithAvg.some(s => s.avgScore < 5);
// console.log('Có học sinh nào điểm trung bình dưới 5 không?', hasLowAvg);


// const allAbove15 = students.every(s => s.age >= 15);
// console.log('Tất cả học sinh có tuổi >= 15 không?', allAbove15);


// const classAvg = studentsWithAvg.reduce((sum, s) => sum + s.avgScore, 0) / studentsWithAvg.length;
// console.log('Điểm trung bình toàn lớp:', classAvg); 


document.addEventListener('DOMContentLoaded', function() {
  const list = document.getElementById('todo-list');
  if (list) {
    list.addEventListener('click', function(e) {
      if (e.target.tagName === 'LI') {
        e.target.classList.toggle('done');
      }
    });
  }
});

$(function() {
  // Lấy dữ liệu từ localStorage khi tải trang
  let users = JSON.parse(localStorage.getItem('users')) || [];

  function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
  }

  function renderTable(data) {
    const tbody = $('#user-table tbody');
    tbody.empty();
    if (data.length === 0) {
      tbody.append('<tr><td colspan="4" style="text-align:center;">Không có dữ liệu</td></tr>');
      return;
    }
    data.forEach((user, idx) => {
      tbody.append(`
        <tr data-idx="${idx}">
          <td>${user.name}</td>
          <td>${user.age}</td>
          <td>${user.gender}</td>
          <td><button class="delete-btn">Xoá</button></td>
        </tr>
      `);
    });
  }

  $('#user-form').on('submit', function(e) {
    e.preventDefault();
    const name = $('#name').val().trim();
    const age = parseInt($('#age').val());
    const gender = $('input[name="gender"]:checked').val();
    if (!name || !age) return;
    users.push({ name, age, gender });
    saveUsers(); // Lưu vào localStorage
    $('#user-form')[0].reset();
    $('input[name="gender"][value="Nam"]').prop('checked', true);
    applyFilter();
  });

  $('#user-table').on('click', '.delete-btn', function() {
    const idx = $(this).closest('tr').data('idx');
    users.splice(idx, 1);
    saveUsers(); // Lưu vào localStorage
    applyFilter();
  });

  $('#filter-age').on('input', function() {
    applyFilter();
  });

  function applyFilter() {
    const maxAge = parseInt($('#filter-age').val());
    let filtered = users;
    if (!isNaN(maxAge)) {
      filtered = users.filter(u => u.age <= maxAge);
    }
    renderTable(filtered);
  }

  renderTable(users);
});