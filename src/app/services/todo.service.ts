import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient) { }

  all(){
    return this.http.get("http://localhost:3005/todos")
  }
  create(payload : any) {
    return this.http.post("http://localhost:3005/todos",payload)
  }
  signUpFormPut(payload : any){
    return this.http.post("http://localhost:3005/todos",payload)
  }
  update(id:any,payload:any){
    return this.http.put("http://localhost:3005/todos/" + id ,payload)
  }
  delete(id:any){
    return this.http.delete("http://localhost:3005/todos/" + id )
  }
  getOneTodo(id:any) {
    return this.http.get("http://localhost:3005/todos/" + id)
  } 
  getToken(payload:any) {
    return this.http.post("http://localhost:3001/login/" , payload)
  }
}
