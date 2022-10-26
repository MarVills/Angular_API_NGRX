import { Injectable } from '@angular/core';
import { SOLUTIONLINKS } from '../../mock-solution-data';
import { CRUDdataService } from '../../shared/cruddata.service';
import { Store } from '@ngrx/store';
import * as productActions from '../../store/products/product.actions';
import { map, Observable, Subscription } from 'rxjs';
import { Product, Products, ProductsState } from 'src/app/store/products.state';
import { selectProducts } from 'src/app/store/products/product.selectors';

import { initialState } from '../../store/products/product.reducer'

@Injectable({
  providedIn: 'root'
})
export class MainPageService {
  product!: Product[]
  dataID: any;
  links = SOLUTIONLINKS;
  products$!: Observable<any>
  // product!: Product;
  // products!: Products[]; 

  constructor(
    private crudService: CRUDdataService,
    // private store: Store<{ products: any }>) { }
    private store: Store<ProductsState>) { }
  postData(data: any){
    return this.crudService.addData(data)
  }

  fetchData(data: any){
    return this.crudService.getData(data.id)
  }

  fetchDataList(){

    this.store.dispatch(productActions.requestFetchProductsACTION());
    // this.products$ = 
    this.store.select('products')
      .subscribe(res => {
        console.log(res)
        return res
      })
      
      
      
    

    // ===============================================================
    // this.links.splice(0);
    // this.crudService.getDataList().subscribe((response)=>{
    //   for (var  data of response.data) {
    //     this.links.push(data)
    //   }
    //   console.log("ALL DATA",this.links);
    // })
  }

  updateData(data: any){
    return this.crudService.updateData(this.dataID, data)
  }

  deleteData(){
    return this.crudService.deleteData(this.dataID)
  }
}
