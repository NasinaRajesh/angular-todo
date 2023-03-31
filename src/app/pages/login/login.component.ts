import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private fb:FormBuilder, private srv:TodoService,private http:HttpClient, private router:Router){

  }
  ngOnInit(){
    localStorage.clear()
  }
  tokenObj : any;
  token : any;

  loginForm = this.fb.group({
    username: ["",Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(25)])],
    email: ["",Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(30)])],
    password: ["",Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(30)])]
  })

  
  onSubmit(event:any){
    event.preventDefault() 

    if(this.loginForm.invalid){
      return
    }

    console.log(this.loginForm)
    this.srv.getToken(this.loginForm.value).subscribe({
      next:(res) =>{
        console.log(res)
        this.tokenObj = res;
        this.token = this.tokenObj.token ;  
        console.log(this.token) ;

        if(this.token) {
          localStorage.setItem("token", this.token)
        }
      },
      error:(err) => {
        console.log(err)
        this.router.navigateByUrl("")
      },
      complete:() => {
          this.router.navigateByUrl("") 
          
      }
    })
  }
}
