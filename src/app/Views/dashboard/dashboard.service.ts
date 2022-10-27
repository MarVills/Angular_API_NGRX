import { Injectable } from '@angular/core';
import { SOLUTIONLINKS } from '../../mock-solution-data';
import { CRUDdataService } from '../../shared/cruddata.service';
import { Store } from '@ngrx/store';
import * as productActions from '../../store/products/product.actions';
import { map, Observable, Subscription } from 'rxjs';
import { Product, Products, ProductsState, UpdateProductDTO } from 'src/app/store/products.state';
import { selectProduct, selectProducts } from 'src/app/store/products/product.selectors';
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

  fetchData(){
    // return this.crudService.getData(this.dataID)

    // this.store.dispatch(productActions.requestFetchProductACTION({payload: this.dataID}))
    // return this.store.select(selectProduct)
    
  }

  fetchDataList(){

    this.store.dispatch(productActions.requestFetchProductsACTION());
    // this.products$ = 
    this.store.select(selectProducts)
      .subscribe(res => {
        if (res.data) {
          console.log(" res",res.data)
          this.links.splice(0);
          for (var data of res.data) {
            // console.log("print data", data )
            this.links.push(data)
          }

          // res.forEach(
          //   (data)=>{
          //     console.log("print",data)
          //   }
          // );
        }
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
    // return this.crudService.updateData(this.dataID, data)
    return this.store.dispatch(productActions.requestUpdateProductACTION({id: this.dataID, payload: data}));
  }

  deleteData(){
    // return this.crudService.deleteData(this.dataID)
    if(confirm("Are you sure you want to delete this?")){
      this.store.dispatch(productActions.requestDeleteProductACTION({payload: this.dataID}));
    }
  }
}
