import { createAction, props } from '@ngrx/store';
import { Product, ProductDTO, Products, UpdateProductDTO } from '../products.state';


export const requestFetchProductsACTION = createAction(
  '[Products] Request Fetch Products',
  props<{ page: number }>()
);
export const successFetchProductsACTION = createAction(
  '[Products] Success Fetch Products',
  props<{payload: ProductDTO[] }>()
);

export const requestFetchProductACTION = createAction(
  '[ Products ] Request Fetch Product',
  props<{payload: number }>()
);
export const successFetchProductACTION = createAction(
  '[ Products ] Success Fetch Product',
  props<{payload: ProductDTO }>()
);

export const requestAddProductACTION = createAction(
  '[ Products ] Request Add Products',
  props<{payload: Product}>()
);

export const successAddProductACTION = createAction(
  '[ Products ] Success Add Products',
  props<{payload: ProductDTO}>()
);

export const requestDeleteProductACTION = createAction(
  '[ Products ] Request Delete Products',
  props<{payload: number}>()
);

export const successDeleteProductACTION = createAction(
  '[ Products ] Success Delete Products',
);

export const requestUpdateProductACTION = createAction(
  '[Products] Request Update Products',
  props<{ id: any, payload: any }>()
);

export const successUpdateProductACTION = createAction(
  '[ Products ] Success Update Products',
  props<{payload: ProductDTO}>()
);

export const onProductFailure = createAction(
  '[ Products ] Products Failure',
  props<{ error: any }>()
);







