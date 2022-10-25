import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, mergeMap, Observable, of, switchMap } from 'rxjs';
import { HandleTokenService } from 'src/app/shared/handle-token.service';
import { Product } from '../products.state';
import * as productActions from './product.actions';



@Injectable()
export class ProductEffects {

  constructor(
    private actions$: Actions,
    private handleToken: HandleTokenService,
    private http: HttpClient,) {}

  config = {
    headers: new HttpHeaders({'Authorization': 'Bearer '+this.handleToken.getToken()})
  }

  addProductEFFECT$: Observable<Action> = createEffect(() => 
  { 
    return this.actions$.pipe(
      // ============== Grouped Functions By Pipe ==============
      ofType(productActions.requestAddProductACTION),
        
      mergeMap((action) =>{
        return this.http.post<Product>('/api/products', action.payload).pipe(
            // ============== Grouped Functions By Pipe ========================= 
            switchMap((data: Product) => [
              productActions.successAddProductACTION({ payload: data })
            ]),
            catchError((error: Error) => {
              return of(productActions.onProductFailure({ error: error }));
            })
            // ==================================================================
          )
        }
      )
      // =======================================================
    )}
  );


}


