import { Component } from '@angular/core';
import {FormBuilder,Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private fb:FormBuilder, private srv:TodoService){

  }

  signupForm= this.fb.group({
    firstname:["",Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(7)])],
    lastname:["",Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(7)])],
    email:["",Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(30)])],
   
  })
  
  onSubmit(event:any){
    console.log("submitted"); 
    event.preventDefault();

    return this.srv.signUpFormPut(this.signupForm.value).subscribe({
      next:(res) => {
        console.log(res)
      },
      error:(err) => {
        console.log(err)
      },
      complete:() => {
        console.log("I am executed even getting res or error")
      }
    })

  }

}