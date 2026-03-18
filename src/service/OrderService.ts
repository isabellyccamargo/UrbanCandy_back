import OrderRepository from "../Repositories/OrderRepository.js";

class OrderService {

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