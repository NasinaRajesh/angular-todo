import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-two-way-binding',
  templateUrl: './two-way-binding.component.html',
  styleUrls: ['./two-way-binding.component.scss']
})
export class TwoWayBindingComponent {
  title:any
  number:any 
  website:any 
  name:any
  tagline:any

  download(){
    window.print()
    // const doc = new jsPDF();
    // autoTable(doc,{html:'#idCard'})
    // doc.save("id card")
  }
}
