export interface ICartItem {
    id_product: number;
    quantity: number;
    sub_total: number;
    products: {
        price: number;
        name: string;
    };
}

export interface ICart {
    items: ICartItem[];
    total: number;
}

export interface IOrderResponse {
    message: string;
    id_orders: number;
}