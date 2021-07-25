import Student from "../model/student.model";

//Insertinf students 
export async function createStudent(req, res) {
  let studentData = new Student(req.body);
  const student = new Student(studentData);
  await student.save()
  .then(data => {
    res.status(200).json(data);
  })
  .catch(error => {
    res.status(500).json(error.message);
  });
}

export async function getAllStudents(req, res) {
  await Student.find({})
  .then(students => {
    res.status(200).json(students);
  })
  .catch(error => {
    res.status(500).json(error.message);
  });
}