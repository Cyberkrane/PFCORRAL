import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditStudentDialogComponent } from '../../../shared/components/edit-student-dialog/edit-student-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from '../../../core/services/student.service';
import { IStudent } from 'src/app/core/interfaces/student.interface';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements AfterViewInit {


  @Input() public STUDENTS_DATA: IStudent[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dataSource = new MatTableDataSource<IStudent>(this.STUDENTS_DATA);

  public displayedColumns: string[] = ['nombre', 'apellido', 'edad', 'genero', 'actions'];
  public student: IStudent = {
    nombre: '',
    apellido: '',
    edad: 0,
    genero: '',
  };

  constructor(
    public dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly studentService: StudentService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((students: IStudent[]) => {
      this.STUDENTS_DATA = students;
      this.dataSource.data = this.STUDENTS_DATA;
    })
  }

  addStudent(student: any) {
    const dialogRef = this.dialog.open(EditStudentDialogComponent, {
      width: '400px',
      data: student,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService.addStudent(result).subscribe(() => {
          this.STUDENTS_DATA.push(result);
          this.dataSource.data = this.STUDENTS_DATA;
          this.snackBar.open(`Alumno ${result.nombre} - ${result.apellido} agregado.`, 'Cerrar', {
            duration: 3000
          });
        });
      }
    });
    this.loadStudents();
  }
  

  updateStudent(student: any) {
    this.studentService.updateStudent(student).subscribe(() => {
      const dialogRef = this.dialog.open(EditStudentDialogComponent, {
        width: '400px',
        data: student,
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const index = this.dataSource.data.findIndex((item: { nombre: string; }) => item.nombre === student.nombre);
          if (index !== -1) {
            this.dataSource.data[index] = result;
          }
        }
      });
      this.loadStudents();
    })
  }

  deleteStudent(student: any) {
    this.studentService.deleteStudent(student).subscribe(() => {
      // this.snackBar.open(`Alumno ${student.nombre} - ${student.apellido} eliminado.`, 'Cerrar', {
      //   duration: 3000,
      // });
      const dialogRef = this.dialog.open(EditStudentDialogComponent, {
        width: '400px',
        data: student,
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const index = this.dataSource.data.findIndex((item: { nombre: string; }) => item.nombre === student.nombre);
          if (index !== -1) {
            this.dataSource.data[index] = result;
          }
        }
      });
      this.loadStudents();
    })
  }


  //  editStudent(student: any) {
  //   const dialogRef = this.dialog.open(EditStudentDialogComponent, {
  //     width: '400px',
  //     data: student,
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       const index = this.dataSource.data.findIndex((item: { nombre: string; }) => item.nombre === student.nombre);
  //       if (index !== -1) {
  //         this.dataSource.data[index] = result;
  //       }
  //     }
  //   });
  // }

  // deleteStudent(student: any) {
  //   const confirmDelete = confirm(`¿Estás seguro de eliminar al alumno ${student.nombre}?`);
  //   if (confirmDelete) {
  //     this.dataSource.data = this.dataSource.data.filter((item: { nombre: string; }) => item.nombre !== student);
  //     this.snackBar.open(`Alumno ${student.nombre} eliminado.`, 'Cerrar', {
  //       duration: 3000,
  //     });
  //   }
  // }

}
