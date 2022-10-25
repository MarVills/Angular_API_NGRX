import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SOLUTIONLINKS } from 'src/app/mock-solution-data';
import { CRUDdataService } from 'src/app/shared/cruddata.service';
import { DialogData } from '../../dashboard/dashboard.component';
import { MainPageService } from '../../dashboard/dashboard.service';

@Component({
  selector: 'solution-link-details',
  templateUrl: './data-details.component.html',
  styleUrls: ['./data-details.component.css']
})
export class DataDetailsComponent implements OnInit {
  
  links = SOLUTIONLINKS;
  openDialog: any;

  constructor(
    public dialogRef: MatDialogRef<DataDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
    private crudService: CRUDdataService,
    private mainService: MainPageService,) {}

  ngOnInit(): void {}
  
  onNoClick = (): void  => this.dialogRef.close(this.dialogRef);

  onFetchData(){
    this.links.splice(0);
    this.crudService.getDataList().subscribe((response)=>{
      console.log(response.data)
      for (var  data of response.data) {
        this.links.push(data)
         console.log(data)
      }})
  }

  onSubmit(linkData: any){
    return this.mainService.updateData(
      {
      "name": linkData.name,
      "image_link": linkData.image_link,
      "price": 0,
      "is_published": 0
      }
    ).subscribe((response)=>{
      console.log(response)
      this.onFetchData()});
  }
  onDelete(){
    this.mainService.deleteData().subscribe((response)=>{
      console.log(response);
      this.onFetchData()})
  }
  goToLink(data: any){
    if(data.substring(0,11)=="https://www"|| data.substring(0,10)=="http://www" || data.substring(0,7)=="http://" || data.substring(0,8)=="https://"){
      window.location.href = data
    }else{
      window.location.href = "https://www.google.com/search?q="+data;
    }
  }
}
