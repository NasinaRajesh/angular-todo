import { Component } from '@angular/core';
import {FormBuilder,Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  id:any 
  constructor(private fb:FormBuilder,private srv:TodoService, private ar:ActivatedRoute, private router:Router) {} 
  
  ngOnInit(id:any) {
    this.ar.params.subscribe((params:any) => {
      this.id = params.id
      console.log(this.id)
    })
    this.getSingleTodo(id) 
  }

  todoForm = this.fb.group({
    title:["",Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(30)])],
    target:["",Validators.compose([Validators.required])],
    // target:[moment().format("DD-MM-YYYY")],
    completed:["",Validators.compose([Validators.required])],
    updatedAt:[moment().format("DD-MM-YYYY")],
    createdAt:[moment().format("DD-MM-YYYY")]
  })

  


  onSubmit(event:any){
    
    event.preventDefault();

    let object= {
    ...this.todoForm.value, target: moment(this.todoForm.value.target).format("YYYY-MM-DD")
    
    };

    if(this.todoForm.value.title == '' || this.todoForm.value.target == ''){
      console.log("Please Enter details");
      return
    }
    if(this.id){
      this.updateMethod(this.id) 
      this.router.navigateByUrl("/")
      return
    }
    
    return this.srv.create(object).subscribe({
      next:(res) => {
        console.log(res)
        this.router.navigateByUrl("/")
      },
      error: (err) => {
        console.log(err)
      },
      complete:() => {
        console.log("done")
      }
    })

    


    
    
  }

  getSingleTodo(id:any){
    return this.srv.getOneTodo(this.id).subscribe({
      next:(res) => {
        console.log(res)
        this.todoForm.patchValue(res)
      }
    })
  }

  updateMethod(id:any){
    return this.srv.update(this.id,this.todoForm.value).subscribe({
      next:(res) => {
        console.log(res)
      }
    })
  }

  
}
