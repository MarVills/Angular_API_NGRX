import { Injectable, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as productActions from '../../store/products/product.actions';
import { selectProducts } from './product.selectors';
import { CRUDdataService } from 'src/app/shared/cruddata.service';
import { Product, PRODUCT_LIST } from '../products.state';
import { switchMap, take, first, debounceTime, Subscription} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { debounce } from 'lodash';
// import { first } from 'lodash';
// import { tap, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnDestroy {

  links = PRODUCT_LIST;
  tempList:any = [];
  dataID: any;
  page: number = 1;
  fetch$:any = Subscription;

  constructor(
    private store: Store,
    private crudService: CRUDdataService,) { }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    this.fetch$.unsubscribe()
  }

  fetchDataList(action?: string){
    console.log("fetch executes time ======")
    if(action){
      switch(action){
        case "next":
          console.log("add =====")
          this.page +=1;
          break;
        case "previous":
          console.log("subtarct")
          this.page -=1;
          break;
        default:
          break;
      }
    }
    this.store.dispatch(productActions.requestFetchProductsACTION({page: this.page}));
    this.fetch$ = this.store.select(selectProducts)
    // .pipe(
    //   // first()
    //   debounceTime(3000)
    // )
   
    .subscribe(
      
      res => {
        console.log("data from backend: ",res)
        if(res.products.data != null){
          this.links.splice(0)
          for (var data of res.products.data) {
            this.links.push(data)
          }
          
        }
        // console.table("print =============")
      }
    )
  }

  postData(value: any){
    return this.store.dispatch(productActions.requestAddProductACTION({payload: {
      "name": value.name,
      "image_link": value.image_link,
      "price": "0",
    }}))
  }

  fetchData(){
    return this.crudService.getData(this.dataID)
  }

  updateData(data: any){
    return this.store.dispatch(productActions.requestUpdateProductACTION({id: this.dataID, payload: data}));
  }

  deleteData(){
    if(confirm("Are you sure you want to delete this?")){
      this.store.dispatch(productActions.requestDeleteProductACTION({payload: this.dataID}));
    }
  }


}
