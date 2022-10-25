import { Action, createReducer, on } from '@ngrx/store';
import * as productActions from './product.actions';
import { ProductDTO, Products, ProductsDTO, ProductsState} from '../products.state';
import { cloneDeep } from 'lodash';


export const productFeatureKey = 'product';

export const initialState: ProductsState = {
  products: [],
};

export const productReducer = createReducer(
  initialState,
  // ================================================================================
  on(productActions.successFetchProductACTION, (state: ProductsState, { payload }) =>
  {
    return {
      ...state,
      products: payload
    }
  }),
  // ================================================================================= 
  on(productActions.successAddProductACTION, (state: ProductsState, { payload }) =>
  {
    let nextState = cloneDeep(state.products);

    let products: ProductDTO = {
      id: payload.id,
      name: payload.name,
      price: payload.price,

      imageLink: payload.imageLink,
    }

    nextState.push(products)

    return {
      ...state,
      products: nextState
    }
  }),
);
