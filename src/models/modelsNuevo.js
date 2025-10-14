// models.js


class StudentDTO {
  constructor(id, name, last_name, quota_day) {
    this.id = id;
    this.name = name;
    this.last_name = last_name;
    this.quota_day= quota_day;
    
}
}

class TeacherDTO {
  constructor(id, name, last_name, password, email, speciality, active= false, availabity= false) {
    this.id = id;
    this.name = name;
    this.last_name = last_name;
    this.password = password;
    this.email= email;
    this.speciality= speciality;
    this.active= active;
    this.availabity= availabity;
  }
}


  
class CourseDTO {
  constructor(id, teacher, course_name,star_hour,end_hour){
   
    this.id = id;
    this.teacher = teacher;
    this.course_name= course_name;
    this.star_hour= star_hour;
    this.end_hour = end_hour;
   
  }
}
   class SubjectDTO {
  constructor(id, subject, correlative) {
    this.id = id;
    this.subject = subject;
    this.correlative = correlative;
  }
}

module.exports = { StudentDTO, TeacherDTO, CourseDTO, SubjectDTO };

