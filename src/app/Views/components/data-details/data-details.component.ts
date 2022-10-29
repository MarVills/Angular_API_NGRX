import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../dashboard/dashboard.component';
import { Store } from '@ngrx/store';
import { ProductService } from 'src/app/store/products/product.service';
import { PRODUCT_LIST } from 'src/app/store/products.state';

@Component({
  selector: 'solution-link-details',
  templateUrl: './data-details.component.html',
  styleUrls: ['./data-details.component.css']
})
export class DataDetailsComponent implements OnInit {
  
  links = PRODUCT_LIST;
  openDialog: any;
  _modifyProductForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DataDetailsComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
    private productService: ProductService,
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
  
  onUpdate(linkData: any){
    this.onNoClick();
    this.productService.updateData(
      {
      "name": linkData.name,
      "image_link": linkData.image_link,
      "price": 0,
      "is_published": 0
      }
    )
  }

  onDelete(){
    console.log("id in delete", this.productService.dataID)
    this.productService.deleteData();
  }

  goToLink(data: any){
    if(data.substring(0,11)=="https://www"|| data.substring(0,10)=="http://www" || data.substring(0,7)=="http://" || data.substring(0,8)=="https://"){
      window.location.href = data
    }else{
      window.location.href = "https://www.google.com/search?q="+data;
    }
  }
}
