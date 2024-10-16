import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public messages: string[] = ['login','register','lista de alumnos', 'cursos', 'clases'];

  constructor() { }

  ngOnInit(): void {
    console.log('navbar');
  }

}
