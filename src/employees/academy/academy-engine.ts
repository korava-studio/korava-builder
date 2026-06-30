export interface AcademyCourse {
  id: string;
  name: string;
  category: string;
  durationHours: number;
}

export class AcademyEngine {
  private courses: AcademyCourse[] = [];

  addCourse(course: AcademyCourse) {
    this.courses.push(course);
  }

  listCourses() {
    return [...this.courses];
  }
}
