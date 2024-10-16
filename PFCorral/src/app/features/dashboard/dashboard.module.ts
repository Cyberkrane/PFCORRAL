import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { StudentsComponent } from '../dashboard/students/students.component';
import { CoursesComponent } from '../dashboard/courses/courses.component';
import { ClassesComponent } from '../dashboard/classes/classes.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    StudentsComponent,
    CoursesComponent,
    ClassesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
