import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as productActions from '../../store/products/product.actions';
import { selectProducts } from './product.selectors';
import { SOLUTIONLINKS } from 'src/app/mock-solution-data';
import { CRUDdataService } from 'src/app/shared/cruddata.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  links = SOLUTIONLINKS;
  dataID: any;
  page: number = 1;

  constructor(
    private store: Store,
    private crudService: CRUDdataService,) { }



  fetchDataList(){
    this.store.dispatch(productActions.requestFetchProductsACTION({page: this.page}));
    this.store.select(selectProducts)
      .subscribe(res => {
        var listTotal = res.products.total;
        console.log("data from backend",res)
        console.log("get list total", res.products.total)
        // console.log("See data", res.products.first_page_url)
        for (var value in res.products.links){
          console.log("get value",res.products.links.indexOf(value))
        }

        if (res.products.data) {
          // this.links.splice(0);
          for (var data of res.products.data) {
            this.links.push(data)
          }
        }

        if(listTotal>5 && this.page ==1){
          console.log("fetch another")
          this.page +=1; 
          this.fetchDataList();
        }
        console.log("link length", this.links.length)
      })
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
