import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DialogData } from '../../dashboard/dashboard.component';
// import { Products } from 'src/app/store/products.state';
import * as productActions from '../../../store/products/product.actions';
import { MainPageService } from '../../dashboard/dashboard.service';
import { Product } from 'src/app/store/products.state';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit{

  openDialog: any;
  _productForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store<{ articles: [any] }>,
    private mainService: MainPageService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.productForm();
  }
  
  onNoClick(): void {
     this.dialogRef.close(this.dialogRef);
  }

  productForm(){
    this._productForm = this.formBuilder.group({
      id:  new FormControl(""),
      name: new FormControl("", Validators.required),
      image_link: new FormControl("", Validators.required),
      price: new FormControl("0"),
      is_published: new FormControl("0"),
     });
  }

  onSubmit(){
    var value = this._productForm.value;

    // this.mainService.postData({
    //   "name": value.name,
    //   "image_link": value.image_link,
    //   "price": 0,
    //   "is_published": 0
    // }).subscribe((result)=>{
    //   console.log(result)
    //   this.mainService.fetchDataList();
    // })

    // linkData.set("price", "0");
    // console.log("the content of data",linkData);

    this.store.dispatch(productActions.requestAddProductACTION({payload: {
      "name": value.name,
      "image_link": value.image_link,
      "price": "0",
    }}))
    
    this.mainService.fetchDataList();
  }
}
