import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, mergeMap, Observable, of, switchMap } from 'rxjs';
import { HandleTokenService } from 'src/app/shared/handle-token.service';
import { Product, ProductDTO } from '../products.state';
import * as productActions from './product.actions';


@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private handleToken: HandleTokenService,
    private http: HttpClient,) {}

  config = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer '+this.handleToken.getToken(),
      // 'Content-Type': 'application/json',
    })
  }

  addProductEFFECT$: Observable<Action> = createEffect(() => 
  { 
    return this.actions$.pipe(
      // ============== Grouped Functions By Pipe ==============
      ofType(productActions.requestAddProductACTION),
        
      mergeMap(action =>{
        console.log("action payload ",action.payload)
        return this.http.post<Product>('/api/products', action.payload, this.config).pipe(
            // ============== Grouped Functions By Pipe ========================= 
            switchMap((data: ProductDTO) => [
              productActions.successAddProductACTION({ payload: data })
            ]),
            catchError((error: Error) => {
              console.log("handle error", error);
              return of(productActions.onProductFailure({ error: error }));
            })
            // ==================================================================
          )
        }
      )
      // =======================================================
    )}
  );

  fetchProductsEFFECT$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(productActions.requestFetchProductsACTION),
    mergeMap(res =>{
      // return this.http.get<ProductDTO[]>('/api/products', this.config).pipe(
      return this.http.get<any>('/api/products', this.config).pipe(
          // switchMap((data: ProductDTO[]) => {
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

  // loadArticlesEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
  //   ofType(productActions.requestFetchProductACTION),
  //   mergeMap(res =>{
  //     return this.http.get<ProductDTO[]>('/api/products').pipe(
  //         switchMap((data: ProductDTO[]) => {
  //           // console.log('effect', data)
  //           return [
  //             productActions.successFetchProductACTION({ payload: data })
  //           ]
  //         }),
  //         catchError((error: Error) => {
  //           return of(productActions.onProductFailure({ error: error }));
  //         })
  //       )
  //     }
  //   )
  // ));



}


