import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Restaurant';
  constructor(){
    this.route = window.location.href
  }
  route:string
  mainRoute(){
    this.route = 'http://localhost:4200/mainpage'
  }
  startRoute(){
    this.route = 'http://localhost:4200/'
  }
}

