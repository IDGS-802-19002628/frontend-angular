import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-catalogos-layout',
  templateUrl: './biblioteca-layout.component.html',
  styleUrls: []
})



export class BibliotecaLayoutComponent {

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

}
