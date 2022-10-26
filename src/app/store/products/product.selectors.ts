import { createFeatureSelector, createSelector } from '@ngrx/store';
import  { Product, ProductDTO, ProductsState } from '../products.state';
// import { ArticlesState } from '../articles.state';
// import { selectAll } from './articles.reducer';

export const selectProductsFeatureState = createFeatureSelector<ProductDTO>('products');

export const selectProducts = createSelector(
    selectProductsFeatureState,
    // selectAll,
    (state: any) => state
)
