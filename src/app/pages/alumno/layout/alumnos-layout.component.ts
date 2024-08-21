import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-alumnos-layout',
  templateUrl: './alumnos-layout.component.html',
  styles: [
  ]
})
export class AlumnosLayoutComponent {


  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
