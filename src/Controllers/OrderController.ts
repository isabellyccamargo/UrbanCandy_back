import { type Request, type Response, type NextFunction } from "express";
import OrderService from "../Service/OrderService.js";
import { type ICart } from "../Types/IOrders.js";
import { ApiException } from "../Exception/ApiException.js";



class OrderController {
    private static validateRequest(id: number, cart: ICart): void {
        if (!id || !cart) throw new Error("Dados insuficientes");
    }

    static async store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id_people, cart, type_payment } = req.body;
        
        OrderController.validateRequest(id_people, cart);
        
        const payment = type_payment || "Não informado";

        const result = await OrderService.checkout(id_people, cart, payment);

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

            const { page, size } = req.query;

            const pageNumber: number = Number(page) || 1;
            const sizeNumber: number = Number(size) || 10;

            const result = await OrderService.findAllOrders(pageNumber, sizeNumber);

            res.status(200).json({
                totalItems: result.count,
                totalPages: Math.ceil(result.count / sizeNumber),
                currentPage: pageNumber,
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