export class Course {
  constructor(id, course_name, start_hour, end_hour, professor) {
    this.id = id;
    this.course_name = course_name;
    this.start_hour = start_hour;
    this.end_hour = end_hour;
    this.professor = professor;
  }
}

export class Student {
  constructor(id, name, last_name, quota_day, approved_subject, courses) {
    this.id = id;
    this.name = name;
    this.last_name = last_name;
    this.quota_day = quota_day;
    this.approved_subject = approved_subject;
    this.courses = courses;
  }
}

export class Subject {
  constructor(id, subject, correlative) {
    this.id = id;
    this.subject = subject;
    this.correlative = correlative;
  }
}
