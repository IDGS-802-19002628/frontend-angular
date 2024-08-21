import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    // Set the title for the not-found page
    this.titleService.setTitle('Page Not Found - 404');
    
    // Log or handle the 404 status code if needed
    console.error('Page not found: 404');
  }

}
