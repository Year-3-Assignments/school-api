import Student from "../model/Student";

export async function createStudent(req, res) {
  const studentData = {
    name: req.body.name,
    email: req.body.email
  };
  console.log('Student image', studentData);
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