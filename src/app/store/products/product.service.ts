import { Injectable, OnDestroy, } from '@angular/core';
import { Store } from '@ngrx/store';
import * as productActions from '../../store/products/product.actions';
import { selectProducts } from './product.selectors';
import { CRUDdataService } from 'src/app/shared/cruddata.service';
import { PRODUCT_LIST } from '../products.state';
import { Subscription} from 'rxjs';


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
    this.fetch$.unsubscribe()
  }

  fetchDataList(action?: string){
    if(action)action == "next" ? this.page +=1 : action == "previous" ? this.page -= 1: null

    this.store.dispatch(productActions.requestFetchProductsACTION({page: this.page}));
    this.fetch$ = this.store.select(selectProducts)
    .subscribe(
      res => {
        console.log("data from backend: ",res)
        if(res.products.data != null){
          this.links.splice(0)
          for (var data of res.products.data) this.links.push(data)
        }
      }
    )
  }

  postData = (value: any) => this.store.dispatch(productActions.requestAddProductACTION({payload: {
      "name": value.name,
      "image_link": value.image_link,
      "price": "0",
    }}))
  
  fetchData = () => this.crudService.getData(this.dataID);

  updateData = (data: any) => {
    this.store.dispatch(productActions.requestUpdateProductACTION({id: this.dataID, payload: data}))
  };

  deleteData = () => {
    confirm("Are you sure you want to delete this?")? 
    this.store.dispatch(productActions.requestDeleteProductACTION({payload: this.dataID})) : null;
  }
}
