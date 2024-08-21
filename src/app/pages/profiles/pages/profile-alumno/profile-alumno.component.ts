import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-alumno',
  templateUrl: './profile-alumno.component.html',
  styleUrls: ['./profile-alumno.component.scss']
})
export class ProfileAlumnoComponent implements OnInit {

  public isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
