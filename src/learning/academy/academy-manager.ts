import { CourseRecord } from "../learning-types.js";

export class AcademyManager {
  private courses = new Map<string, CourseRecord>();

  addCourse(course: CourseRecord) {
    this.courses.set(course.id, { ...course });
    return course;
  }

  listCourses() {
    return Array.from(this.courses.values());
  }

  getCourse(courseId: string) {
    return this.courses.get(courseId) ?? null;
  }
}
