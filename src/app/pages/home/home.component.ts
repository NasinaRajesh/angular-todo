import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  Todos:any = [];
  token:any
  displayedColumns: string[] = ['id', 'title', 'completed', 'target', 'updatedAt','createdAt','actions'];
  
  
 
   @ViewChild(MatPaginator)  paginator:any = MatPaginator;
   @ViewChild(MatSort)matsort:any;

   constructor(private srv:TodoService, private router:Router){}
   
   ngOnInit(): void {
     console.log("I am executed by Angular whenever the component initialize") 
     this.getAllTodos();
     this.token = localStorage.getItem("token")
     
   }

  ngAfterViewInit() {
    this.Todos.paginator = this.paginator;
  }
  
  getAllTodos(){
    return this.srv.all().subscribe({
      next:(res:any) => {
        console.log(res)
        this.Todos=res;
        this.Todos = new MatTableDataSource(res);
        this.Todos.paginator = this.paginator;
        this.Todos.sort = this.matsort;
      },
      error:(err) => {
        console.log(err)
      },
      complete:() => {

      }
    }) 
  }

  applyFilter(event:any) {
    this.Todos.filter = event.target.value
  }
  
  edit(id:any) {
    if(this.token){
      console.log(id);
       this.router.navigateByUrl("/todo/" + id)
    }
    
  }

  delete(id:any) {
    if(this.token){
      let check = window.confirm("are you sure you want to delete")
    console.log(check)
    if(check){
       this.srv.delete(id).subscribe({
        next:(res) => {
          this.getAllTodos()
        },
        error:(err) => {
          console.log(err)
        }
      })
    }
    else {
      this.getAllTodos()
    }
    console.log(id) 
    }
    
  }

  download(event:any){
    // localStorage.getItem("token")
    // console.log(this.token) 
    if(this.token){
      console.log("ok")
      const doc = new jsPDF();
      autoTable(doc,{html:'#table'})
      doc.save("todos")
    } 
    else{
      alert("your not an admin")
    }
    
  }
  fileName= 'ExcelSheet.xlsx';
  exportexcel(event:any){
    if(this.token){
      /* pass here the table id */
     let element = document.getElementById('table');
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  
     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
     /* save to file */  
     XLSX.writeFile(wb, this.fileName);
    } 
    else {
      alert("Your not a an admin")
    }
    
 
  }
}
