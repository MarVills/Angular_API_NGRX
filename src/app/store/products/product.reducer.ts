import { Action, createReducer, on } from '@ngrx/store';
import * as productActions from './product.actions';
import { ProductDTO, Products, ProductsDTO, ProductsState} from '../products.state';
import { cloneDeep } from 'lodash';


export const productFeatureKey = 'product';

export const initialState: ProductsState = {
  // products: [],
  products: [],
  selected_product: ''
};

export const productReducer = createReducer(
  initialState,

  // ================================================================================
  on(productActions.successFetchProductsACTION, (state: ProductsState, { payload }) =>
  {
    // console.log('successFetchProductsACTION', payload)
    return { ...state, products: payload }
  }),
  
  // ================================================================================= 
  on(productActions.successFetchProductACTION, (state: ProductsState, { payload }) =>
  {
    return {
      ...state,
      selected_product: payload
    }
  }),

  // ================================================================================= 
  on(productActions.successAddProductACTION, (state: ProductsState, { payload }) =>
  {
    let products: any = {
      id: payload.id,
      name: payload.name,
      price: payload.price,
      image_link: payload.image_link,
    }
    return { ...state, products }
  }),

  //==================================================================================
  on(productActions.requestUpdateProductACTION, (state: ProductsState, { payload }) =>{
    console.log(state);
    const updateProduct = [state.products].map((product:any)=> {
      return payload === product.id ? payload : product;
    })
    
    return { ...state, products: updateProduct, selected_product: '' };
  }),

  // ================================================================================= 
  on(productActions.requestDeleteProductACTION, (state: ProductsState, { payload }) =>{
    // let nextState = cloneDeep(state.products);
    // let newData = nextState.filter((item:any) => item.id !== payload);
    let newState = [state.products];
    newState.splice(payload, 1);
    return { ...state, products: newState };
  }),
);

