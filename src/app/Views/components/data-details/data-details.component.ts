import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SOLUTIONLINKS } from 'src/app/mock-solution-data';
import { CRUDdataService } from 'src/app/shared/cruddata.service';
import { DialogData } from '../../dashboard/dashboard.component';
import { MainPageService } from '../../dashboard/dashboard.service';
import { Store } from '@ngrx/store';
import * as productActions from '../../../store/products/product.actions';

@Component({
  selector: 'solution-link-details',
  templateUrl: './data-details.component.html',
  styleUrls: ['./data-details.component.css']
})
export class DataDetailsComponent implements OnInit {
  
  links = SOLUTIONLINKS;
  openDialog: any;
  _modifyProductForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DataDetailsComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
    private crudService: CRUDdataService,
    private mainService: MainPageService,
    private store: Store) {}

  ngOnInit(): void {
    console.log(this.data);
  }
  
  onNoClick(): void  {
    this.dialogRef.close();
  } 

  productForm(){
    this._modifyProductForm = this.formBuilder.group({
      id:  new FormControl(""),
      name: new FormControl("", Validators.required),
      image_link: new FormControl("", Validators.required),
      price: new FormControl("0"),
      is_published: new FormControl("0"),
     });
  }

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
    this.onNoClick();
    this.mainService.updateData(
      {
      "name": linkData.name,
      "image_link": linkData.image_link,
      "price": 0,
      "is_published": 0
      }
    )
    
    // .subscribe((response)=>{
    //   console.log(response)
    //   this.onFetchData()});
  }
  onDelete(){
    // this.mainService.deleteData().subscribe((response)=>{
    //   console.log(response);
    //   this.onFetchData()})
    console.log("id in delete", this.mainService.dataID)
    this.mainService.deleteData();
    this.onFetchData();
  }

  // onUpdate(data:any){
  //   return this.crudService.updateData(data.id, data).subscribe((response)=>{
  //     console.log(response)
  //     this.mainService.fetchDataList()
      
  //   });
  // }

  goToLink(data: any){
    if(data.substring(0,11)=="https://www"|| data.substring(0,10)=="http://www" || data.substring(0,7)=="http://" || data.substring(0,8)=="https://"){
      window.location.href = data
    }else{
      window.location.href = "https://www.google.com/search?q="+data;
    }
  }
}
