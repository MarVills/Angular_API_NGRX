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
    (state: ProductsState) => {
        var value = state.products
        // console.log("State",state)
        // console.log("Products",state.products.last_page_url)
        // console.log("Links", value)
        for(var val in value){
            val
            // console.log(val);
        }
        return state
    }
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

