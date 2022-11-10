import { Injectable, OnDestroy, } from '@angular/core';
import { Store } from '@ngrx/store';
import * as productActions from '../../store/products/product.actions';
import { selectProduct } from './product.selectors';
import { CRUDdataService } from 'src/app/shared/cruddata.service';
import { PRODUCT_LIST } from '../products.state';
import { Subscription} from 'rxjs';
import { indexOf } from 'lodash';
import { Product } from '../products.state';


@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnDestroy {

  productList = PRODUCT_LIST;
  tempList:any = [];
  dataID: any;
  page: number = 1;
  fetch$:any = Subscription;
  update$:any = Subscription;
  pages:number[] = [1];

  constructor(
    private store: Store,
    private crudService: CRUDdataService,) { }

  ngOnDestroy(): void {
    this.fetch$.unsubscribe()
    this.update$.unsubscribe()
  }

  fetchDataList(action?: string, pageNumber?: number){
    if(action)action == "next" ? this.page +=1 : action == "previous" ? this.page -= 1: null

    this.store.dispatch(productActions.requestFetchProductsACTION({page: pageNumber != null? pageNumber:this.page}));
    this.fetch$ = this.store.select(selectProduct)
    .subscribe(
      res => {
        // console.log("data from backend: ",res)
        if(res.products.data != null){
          this.productList.splice(0)
          this.pages.splice(0)
          for (var data of res.products.data) this.productList.push(data)
          for(var data of res.products.links ) this.pages.push(res.products.links.indexOf(data))
        }
        // console.log("all Pages",this.pages);
        this.pages.shift(),
        this.pages.pop()
        // console.log("all data: ", res.products.links[1])
      }
    )
  }

  // getTempId(){
  //   var id = 0;
  //   for(var item of PRODUCT_LIST){
  //     if(id < item.id!){
  //       id = item.id!
  //     }
  //   }
  //   return id + 1;
  // }

  async addProduct (value: any) {
    var data = {
      "name": value.name,
      "image_link": value.image_link,
      "price": "0",
    }

    await this.store.dispatch(productActions.requestAddProductACTION({payload: data}))
    
    PRODUCT_LIST.length < 5 ? PRODUCT_LIST.push({
      "id": this.dataID,
      "name": value.name,
      "image_link": value.image_link,
      "price": "0",
    }):null
    

    // setTimeout(() => {
    //   console.log(this.dataID)
    // }, 3000);
  } 
  
  fetchData = () => this.crudService.getData(this.dataID);

  updateData = (data: any) => {

    for(var item of this.productList){
      if(item.id == this.dataID){
        this.productList[this.productList.indexOf(item)] = {
          id: this.dataID,
          name: data.name,
          image_link: data.image_link,
          price: "0"
        }
      }
    }

    this.store.dispatch(productActions.requestUpdateProductACTION({id: this.dataID, payload: data}))
  };

  async deleteData () {
    if(confirm("Are you sure you want to delete this?")){

      for(var item of PRODUCT_LIST){
        if(item.id == this.dataID){
          console.log("BEFORE",PRODUCT_LIST)
          PRODUCT_LIST.splice(PRODUCT_LIST.indexOf(item), 1)
          console.log("AFTER",PRODUCT_LIST)
        }
      }

      this.store.dispatch(productActions.requestDeleteProductACTION({payload: this.dataID}))
    }
  }
}
