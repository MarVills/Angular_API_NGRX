import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, mergeMap, Observable, of, switchMap } from 'rxjs';
import { HandleTokenService } from 'src/app/shared/handle-token.service';
import { Product, ProductDTO } from '../products.state';
import * as productActions from './product.actions';
import { ProductService } from './product.service';
// import { TokenInterceptor } from 'src/app/shared/token.interceptor';


@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private handleToken: HandleTokenService,
    private http: HttpClient,
    private productService: ProductService,
    // private tokenInterceptor: TokenInterceptor,
    ) {}

  config = {
    headers: new HttpHeaders({'Authorization': 'Bearer '+this.handleToken.getToken()})
  }
  

  fetchProductsEFFECT$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(productActions.requestFetchProductsACTION),
    mergeMap(res =>{
      // console.log("whats inside res", res)
      // console.log("curent page", res.page)
      return this.http.get<any>(`/api/products?page=${res.page.toString()}`, this.config).pipe(
        switchMap((data: any) => {
          console.log('effect', data)
          return [
            productActions.successFetchProductsACTION({ payload: data })
          ]
        }),
        catchError((error: Error) => of(productActions.onProductFailure({ error: error })))
      )
    })
  ));

  fetchProductEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(productActions.requestFetchProductACTION),
    mergeMap(data =>{
      return this.http.get<Product>(`/api/products/${data.payload}`, this.config).pipe(
        switchMap((data: Product) => {
          return [
            productActions.successFetchProductACTION({ payload: data })
          ]
        }),
        catchError((error: Error) => of(productActions.onProductFailure({ error: error })))
      )
    })
  ));

  addProductEFFECT$: Observable<Action> = createEffect(() => { 
    return this.actions$.pipe(
      ofType(productActions.requestAddProductACTION),
      mergeMap(action =>{
        console.log("action payload ",action.payload)
        return this.http.post<Product>('/api/products', action.payload, this.config).pipe(
          switchMap((data: ProductDTO) => {
            console.log("after add",data)
            var returnData =  [productActions.successAddProductACTION({ payload: data })]
            console.log("return data: ",returnData)
            this.productService.dataID = returnData[0].payload.id
            // console.log("specific data: ",returnData[0].payload.id)
            return returnData;
          }),
          catchError((error: Error) => of(productActions.onProductFailure({ error: error })))
        )
      })
    )}
  );

  updateArticleActionEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(productActions.requestUpdateProductACTION),
    mergeMap(action => {
      return this.http.put<Product>(`/api/products/${this.productService.dataID}`, action.payload, this.config).pipe(
        switchMap((data: ProductDTO) => {
          var returnData = [productActions.successUpdateProductACTION({ payload: data })];
          console.log("success data", returnData)
          return returnData;
        }
        ),
        catchError((error: Error) => of(productActions.onProductFailure({ error: error })))
      )
    })
  ));

  deleteProductEFFEET$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(productActions.requestDeleteProductACTION),
    mergeMap(data =>{
      return this.http.delete<number>(`/api/products/${this.productService.dataID}`, this.config).pipe(
        switchMap(res => [
          productActions.successDeleteProductACTION()
        ]),
        catchError((error: Error) => of(productActions.onProductFailure({ error: error })))
      )
    })
  ));
}


