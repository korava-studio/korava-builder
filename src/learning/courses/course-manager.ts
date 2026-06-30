import { CourseRecord } from "../learning-types.js";

export class CourseManager {
  private courses = new Map<string, CourseRecord>();

  add(course: CourseRecord) {
    this.courses.set(course.id, { ...course });
    return course;
  }

  list() {
    return Array.from(this.courses.values());
  }

  searchByCategory(category: string) {
    return this.list().filter((course) => course.category === category);
  }
}
