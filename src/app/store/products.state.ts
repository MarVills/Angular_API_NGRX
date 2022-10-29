
export interface Product {
    id?: number,
    name: string,
    price: string,
    image_link: string, 
}
export interface ProductDTO {
    id?: number,
    name: string,
    price: string,
    image_link: string, 
}

export interface UpdateProductDTO {
    id?: number,
    name: string,
    price: string,
    image_link: string, 
}

export interface Products {
    products: Product[]
}

export interface ProductsDTO {
    products: ProductDTO[]
}

export interface ProductsState {
    products: any,
    selected_product: any
}

export const PRODUCT_LIST: Product[] = [
  
];






