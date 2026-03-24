import { ApiException } from "../Exception/ApiException.js";
import OrderRepository from "../Repositories/OrderRepository.js";
import { type ICart } from "../Types/IOrders.js";

class OrderService {
    static async checkout(id_people: number, cart: ICart, type_payment: string): Promise<any> {

        this.validateCheckoutData(id_people, cart, type_payment);

        return await OrderRepository.createFullOrder(
            id_people,
            cart.items,
            cart.total,
            type_payment
        );
    }

    private static validateCheckoutData(id_people: number, cart: ICart, type_payment: string): void {
        if (!id_people || id_people <= 0) {
            throw new ApiException("USER_NOT_FOUND", 401, "Usuário não identificado para o pedido.");
        }

        if (!cart?.items?.length) {
            throw new ApiException("CART_EMPTY", 400, "O carrinho enviado está vazio.");
        }

        if (cart.total <= 0) {
            throw new ApiException("INVALID_TOTAL", 400, "O valor total do pedido é inválido.");
        }

        if (!type_payment || type_payment.trim() === "") {
            throw new ApiException("PAYMENT_REQUIRED", 400, "O método de pagamento deve ser informado.");
        }
    }

    private static validateCart(cart: ICart): void {
    if(!cart?.items?.length) {
        throw new ApiException("CART_EMPTY", 400, "Carrinho vazio");
    }
        if(cart.total <= 0) {
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