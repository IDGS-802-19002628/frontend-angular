import { Component, OnInit } from '@angular/core';
import { navItemsAdmistrador } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavItem } from './nav-item/nav-item';
import { AuthService } from 'src/app/services/auth.service';
import { V } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  navItems : NavItem[] = [];
  lstPermisos: string[] = [];
  constructor(
    public navService: NavService,
    private jwtHelper: JwtHelperService,
    private authService: AuthService
    

  ) {}

 async ngOnInit() {

  this.navItems = navItemsAdmistrador;
  }

  
}
