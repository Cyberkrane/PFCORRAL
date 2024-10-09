import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditStudentDialogComponent } from '../../shared/components/edit-student-dialog/edit-student-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IStudent {
  nombre: string;
  apellido: string;
  edad: number;
  genero: string;
}

const STUDENTS_DATA: IStudent[] = [
    { nombre: 'Clark', apellido: 'Kent', edad: 30, genero: 'Masculino' },
    { nombre: 'Lana', apellido: 'Lang', edad: 28, genero: 'Femenino' },
    { nombre: 'Lex', apellido: 'Luthor', edad: 35, genero: 'Masculino' },
    { nombre: 'Chloe', apellido: 'Sullivan', edad: 29, genero: 'Femenino' },
    { nombre: 'Lois', apellido: 'Lane', edad: 32, genero: 'Femenino' },
    { nombre: 'Oliver', apellido: 'Queen', edad: 33, genero: 'Masculino' },
    { nombre: 'Jonathan', apellido: 'Kent', edad: 60, genero: 'Masculino' },
    { nombre: 'Martha', apellido: 'Kent', edad: 58, genero: 'Femenino' },
    { nombre: 'Pete', apellido: 'Ross', edad: 30, genero: 'Masculino' },
    { nombre: 'Lionel', apellido: 'Luthor', edad: 65, genero: 'Masculino' },
    { nombre: 'Tess', apellido: 'Mercer', edad: 34, genero: 'Femenino' },
    { nombre: 'Kara', apellido: 'Zor-El', edad: 25, genero: 'Femenino' },
    { nombre: 'Jor-El', apellido: 'El', edad: 50, genero: 'Masculino' },
    { nombre: 'Zod', apellido: 'Zod', edad: 40, genero: 'Masculino' },
    { nombre: 'Davis', apellido: 'Bloome', edad: 33, genero: 'Masculino' },
    { nombre: 'Jimmy', apellido: 'Olsen', edad: 28, genero: 'Masculino' },
    { nombre: 'Alicia', apellido: 'Baker', edad: 26, genero: 'Femenino' },
    { nombre: 'Jason', apellido: 'Teague', edad: 32, genero: 'Masculino' },
    { nombre: 'Whitney', apellido: 'Fordman', edad: 30, genero: 'Masculino' }
  ];


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements AfterViewInit{

  
 @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dataSource = new MatTableDataSource<IStudent>(STUDENTS_DATA);
 
  public displayedColumns: string[] = ['nombre', 'apellido', 'edad', 'genero', 'actions'];

constructor(
  public dialog: MatDialog,
  private readonly snackBar: MatSnackBar
) { }

 ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
 }

 editStudent(student: any) {
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
}

deleteStudent(student: any) {
  const confirmDelete = confirm(`¿Estás seguro de eliminar al alumno ${student.nombre}?`);
  if (confirmDelete) {
    this.dataSource.data = this.dataSource.data.filter((item: { nombre: string; }) => item.nombre !== student);
    this.snackBar.open(`Alumno ${student.nombre} eliminado.`, 'Cerrar', {
      duration: 3000,
    });
  }
}

}
