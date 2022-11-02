import { createFeatureSelector, createSelector } from '@ngrx/store';
import { of } from 'rxjs';
import  { Product, ProductDTO, ProductsState } from '../products.state';

export const selectProductsFeatureState = createFeatureSelector<any>('product');

export const selectProduct = createSelector(
    selectProductsFeatureState,
    (state: ProductsState) => state
)

// export const selectProduct = createSelector(
//     selectProductsFeatureState,
//     (state: ProductsState) => {
//         return state
//     }
// )

