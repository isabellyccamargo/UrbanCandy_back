import { ApiException } from "../Exception/ApiException.js";
import OrderRepository from "../Repositories/OrderRepository.js";
import { type ICart } from "../Types/IOrders.js";

class OrderService {
    static async checkout(id_people: number, cart: ICart, type_payment: string): Promise<any> {
        this.validateCart(cart);

        return await OrderRepository.createFullOrder(
            id_people,
            cart.items,
            cart.total,
            type_payment 
        );
    }

    private static validateCart(cart: ICart): void {
        if (!cart?.items?.length) {
            throw new ApiException("CART_EMPTY", 400, "Carrinho vazio");
        }
        if (cart.total <= 0) {
            throw new ApiException("INVALID_TOTAL", 400, "Total deve ser maior que zero");
        }
    }

    static async findAllOrders(page: number, size: number) {
        const limit = size;
        const offset = (page - 1) * size;
        return await OrderRepository.findAllOrders(limit, offset);
    }

    static async findByIdOrder(id_orders: number) {
        return await OrderRepository.findByIdOrder(id_orders);
    }
}

export default OrderService;