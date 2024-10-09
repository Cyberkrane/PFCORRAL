import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-student-dialog',
  templateUrl: './edit-student-dialog.component.html',
})
export class EditStudentDialogComponent {
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<EditStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nombre: [data.nombre],
      apellido: [data.apellido],
      edad: [data.edad],
      genero: [data.genero],
    });
  }

  save() {
    this.dialogRef.close(this.form.value); // Devuelve los datos editados
  }

  close() {
    this.dialogRef.close();
  }
}
