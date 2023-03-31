import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private http: HttpClient) {}
  responseCount = 0;
ngOnInit() {
  return this.http.get('http://localhost:3005/todos').subscribe({
    next:(res:any) => {
      console.log(res)
      this.responseCount = res.length
    }
  });
}



  }

