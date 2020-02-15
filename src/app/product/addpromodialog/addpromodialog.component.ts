import { Component, OnInit, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, DialogPosition } from '@angular/material/dialog';

@Component({
  selector: 'app-addpromodialog',
  templateUrl: './addpromodialog.component.html',
  styleUrls: ['./addpromodialog.component.css']
})
export class AddpromodialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddpromodialogComponent>,
    @Inject(MAT_DIALOG_DATA) public info) { }
  ngOnInit() {
  }
  onNoClick(){
    this.dialogRef.close();
  }
}
