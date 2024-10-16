import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly apiUrl: string = 'http://localhost:3000/alumnos';

  constructor(private readonly http: HttpClient) { }

  getStudents(): any {
    return this.http.get(this.apiUrl);
  }

  addStudent(student: any) {
    return this.http.post(this.apiUrl, student);
  }

  updateStudent(student: any) {
    return this.http.put(`${this.apiUrl}/${student.id}`, student);
  }

  deleteStudent(student: any) {
    return this.http.delete(`${this.apiUrl}/${student.id}`);
  }
}
