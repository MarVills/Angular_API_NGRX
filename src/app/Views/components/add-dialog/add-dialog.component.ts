import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../dashboard/dashboard.component';


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {
openDialog: any;
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    
  ) {}
  
  onNoClick(): void {
     this.dialogRef.close(this.dialogRef);
  }

  onSubmit(linkData: any){
    console.log("something")

    // this.mainService.postData({
    //   "name": linkData.name,
    //   "image_link": linkData.image_link,
    //   "price": 0,
    //   "is_published": 0
    // }).subscribe((result)=>{
    //   console.log(result)
    //   this.mainService.fetchDataList();
    // })


  }
}
