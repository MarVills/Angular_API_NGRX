
export interface Product {
    id?: number,
    name?: string,
    price?: string,
    image_link?: string, 
}
export interface ProductDTO {
    id?: number,
    name?: string,
    price?: string,
    image_link?: string, 
}

export interface UpdateProductDTO {
    id?: number,
    name?: string,
    price?: string,
    image_link?: string, 
}

export interface Products {
    products: Product[]
}

export interface ProductsDTO {
    products: ProductDTO[]
}

export interface ProductsState {
    // products: ProductDTO[],
    products: any,
    selected_product: any
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



