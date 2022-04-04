import axios, { AxiosResponse } from "axios"

type RequestWrapper<T> = {
    status: string;
    data: T
}

export type Product = {
    product_id: number;
    name: string;
    quantity: number;
    initial_price: number;
    createdBy: {
        display_name: string;
    }
    avatar: {
        original: string;
        compressed: string;
    }
    quantity_available: number;
}


export const getProducts = () => {
    return axios.get<any, AxiosResponse<RequestWrapper<{ products: Product[] }>>>(
        `${process.env.REACT_APP_API_BASE_URL}/products`
    ).then(
        (res) => res.data.data.products
    );
}

