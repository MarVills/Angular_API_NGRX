import { createFeatureSelector, createSelector } from '@ngrx/store';
import { of } from 'rxjs';
import  { Product, ProductDTO, ProductsState } from '../products.state';
// import { ArticlesState } from '../articles.state';
// import { selectAll } from './articles.reducer';


// ==================== Feature Selector =====================================
export const selectProductsFeatureState = createFeatureSelector<any>('product');

// ==================== Select Product list ==================================
export const selectProducts = createSelector(
    selectProductsFeatureState,
    (state: ProductsState) => state.products
)

// ==================== Select single product ================================
export const selectProduct = createSelector(
    selectProductsFeatureState,
    (state: ProductsState) => {
        // of(state.products).subscribe((res)=>{
        //     console.log("product id====: " ,"======")
        // })
        // state.products.type
        return state
        
    }
)

