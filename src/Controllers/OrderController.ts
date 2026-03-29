import { type Request, type Response, type NextFunction } from "express";
import OrderService from "../Service/OrderService.js";
import { ApiException } from "../Exception/ApiException.js";

interface ICartItem {
    id_product: number;
    quantity: number;
    sub_total: number;
    products: {
        price: number;
        name: string;
    };
}

interface ICart {
    items: ICartItem[];
    total: number;
}

class OrderController {
    private static validateRequest(id: number, cart: ICart): void {
        if (!id || !cart) throw new Error("Dados insuficientes");
    }

    // OrderController.ts -> método store
    static async store(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_people, cart, id_payment } = req.body;

            OrderController.validateRequest(id_people, cart);

            const finalPaymentId = id_payment || 0;

            const result = await OrderService.checkout(id_people, cart, finalPaymentId);

            res.status(201).json({
                message: "Pedido realizado com sucesso!",
                id_orders: result.id_orders
            });
        } catch (error) {
            next(error);
        }
    }

    static async findAllOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Pega o size da query ou usa 5 para bater com o front
            const page = Number(req.query.page) || 1;
            const size = Number(req.query.size) || 5;

            const result = await OrderService.findAllOrders(page, size);

            res.status(200).json({
                totalItems: result.count,
                totalPages: Math.ceil(result.count / size),
                currentPage: page,
                data: result.rows
            });
        } catch (error) {
            next(error);
        }
    }

    static async findByIdOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { id_orders } = req.params;

            if (!id_orders || Array.isArray(id_orders)) {
                throw new ApiException("INVALID_ID", 400, "id_orders");
            }

            const id: number = Number(id_orders);

            if (Number.isNaN(id)) {
                throw new ApiException("INVALID_ID", 400, id_orders);
            }

            const order = await OrderService.findByIdOrder(id);

            if (!order) {
                throw new ApiException("ORDER_NOT_FOUND", 404, id);
            }

            res.status(200).json(order);

        } catch (error) {
            next(error);
        }
    }

}

export default OrderController;