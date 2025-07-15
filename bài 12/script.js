const students = [
    { id: 1, name: 'An', age: 16, gender: 'Nam', scores: [7, 8, 9] },
    { id: 2, name: 'Bình', age: 17, gender: 'Nam', scores: [6, 6, 5] },
    { id: 3, name: 'Cúc', age: 16, gender: 'Nữ', scores: [9, 9, 10] },
    { id: 4, name: 'Dương', age: 18, gender: 'Nữ', scores: [4, 5, 6] },
    { id: 5, name: 'E', age: 15, gender: 'Nam', scores: [10, 10, 10] }
  ];
  
  
  console.log('Tên và tuổi của từng học sinh:');
  students.forEach(s => {
    console.log(`Tên: ${s.name}, Tuổi: ${s.age}`);
  });
  
  
  const studentsWithAvg = students.map(s => ({
    name: s.name,
    avgScore: s.scores.reduce((a, b) => a + b, 0) / s.scores.length
  }));
  console.log('Tên và điểm trung bình:', studentsWithAvg);
  
  
  const goodStudents = studentsWithAvg.filter(s => s.avgScore >= 8);
  console.log('Học sinh có điểm trung bình >= 8:', goodStudents);
  
  
  const firstOlder17 = students.find(s => s.age >= 17);
  console.log('Học sinh đầu tiên có tuổi >= 17:', firstOlder17);
  
  
  const hasLowAvg = studentsWithAvg.some(s => s.avgScore < 5);
  console.log('Có học sinh nào điểm trung bình dưới 5 không?', hasLowAvg);


  const allAbove15 = students.every(s => s.age >= 15);
  console.log('Tất cả học sinh có tuổi >= 15 không?', allAbove15);
  

  const classAvg = studentsWithAvg.reduce((sum, s) => sum + s.avgScore, 0) / studentsWithAvg.length;
  console.log('Điểm trung bình toàn lớp:', classAvg); 