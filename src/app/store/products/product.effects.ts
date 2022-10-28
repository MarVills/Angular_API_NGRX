import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, mergeMap, Observable, of, switchMap } from 'rxjs';
import { HandleTokenService } from 'src/app/shared/handle-token.service';
import { Product, ProductDTO } from '../products.state';
import * as productActions from './product.actions';
import { ProductService } from './product.service';


@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private handleToken: HandleTokenService,
    private http: HttpClient,
    private productService: ProductService) {}

  config = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer '+this.handleToken.getToken(),
    })
  }

  fetchProductsEFFECT$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(productActions.requestFetchProductsACTION),
    mergeMap(res =>{
      console.log("whats inside res", res.page)
      return this.http.get<any>(`/api/products?page=${res.page.toString()}`, this.config).pipe(
          switchMap((data: any) => {
            console.log('effect', data.data)
            return [
              productActions.successFetchProductsACTION({ payload: data })
            ]
          }),
          catchError((error: Error) => {
            return of(productActions.onProductFailure({ error: error }));
          })
        )
      }
    )
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
          catchError((error: Error) => {
            return of(productActions.onProductFailure({ error: error }));
          })
        )
      }
    )
  ));

  addProductEFFECT$: Observable<Action> = createEffect(() => { 
    return this.actions$.pipe(
      ofType(productActions.requestAddProductACTION),
      mergeMap(action =>{
        console.log("action payload ",action.payload)
        return this.http.post<Product>('/api/products', action.payload, this.config).pipe(
            switchMap((data: ProductDTO) => [
              productActions.successAddProductACTION({ payload: data })
            ]),
            catchError((error: Error) => {
              console.log("handle error", error);
              return of(productActions.onProductFailure({ error: error }));
            })
          )
        }
      )
    )}
  );

  updateArticleActionEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(productActions.requestUpdateProductACTION),
    mergeMap(action => {
      return this.http.put<Product>(`/api/products/${this.productService.dataID}`, action.payload, this.config).pipe(
          switchMap((data: ProductDTO) => [
            productActions.successUpdateProductACTION({ payload: data })
          ]),
          catchError((error: Error) => {
            return of(productActions.onProductFailure({ error: error }));
          })
        )
      }
    ))
  );

  deleteProductEFFEET$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(productActions.requestDeleteProductACTION),
    mergeMap(data =>{
      console.log("supposed to be id",data.type);
      return this.http.delete<number>(`/api/products/${this.productService.dataID}`, this.config).pipe(
          switchMap(res => [
            productActions.successDeleteProductACTION()
          ]),
          catchError((error: Error) => {
            return of(productActions.onProductFailure({ error: error }));
          })
        )
      }
    ))
  );

 


}


