import axios, { AxiosResponse } from "axios"

type RequestWrapper<T> = {
    status: string;
    data: T;
}

type ProductAuthor = {
    user_id: number;
    display_name: string;
    public_address: string;
    custom_url: string;
    image: {
        original: string;
        compressed: string;
    }
}; 

export type Product = {
    product_id: number;
    name: string;
    quantity: number;
    initial_price: number;
    created_by: ProductAuthor;
    avatar: {
        original: string;
        compressed: string;
    }
    quantity_available: number;
    quantity_nfts_created: number;
}


export const getProducts = () => {
    return axios.get<any, AxiosResponse<RequestWrapper<{ products: Product[] }>>>(
        `${process.env.REACT_APP_API_BASE_URL}/products`
    ).then(
        (res) => res.data.data.products
    );
}

