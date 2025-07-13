
let students = [];


students.push("An", "Bình", "Chi");


let index = students.indexOf("Bình");
if (index !== -1) {
  students.splice(index, 1);
}


students.unshift("Dũng");


console.log("Danh sách học sinh cuối cùng:", students);
