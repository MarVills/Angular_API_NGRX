
export interface Product {
    id?: number,
    name?: string,
    price?: string,
    imageLink?: string, 
}
export interface ProductDTO {
    id?: number,
    name?: string,
    price?: string,
    imageLink?: string, 
}

export interface Products {
    products: Product[]
}

export interface ProductsDTO {
    products: ProductDTO[]
}

export interface ProductsState {
    products: ProductDTO[],
}

// export interface ProductState {
//     id?: number,
//     name?: string,
//     price?: string,
//     imageLink?: string, 
// }

// export interface ProductState {
//     products: ProductDTO[]
// }



