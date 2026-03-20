import Orders from "../Models/Orders.js";
import People from "../Models/People.js";
import OrderItem from "../Models/OrderItem.js";
import Products from "../Models/Products.js";
import sequelize from "../Config/Config.js";
import { Transaction } from "sequelize";
import { type ICartItem } from "../Types/IOrders.js";

class OrderRepository {
    private async _createItems(id_order: number, items: any[], t: Transaction): Promise<void> {
        const formatted = items.map(item => {
            const price = item.products?.price ? parseFloat(item.products.price) : 0;

            const quantity = item.quantity || 1;
            const subTotal = item.sub_total ? parseFloat(item.sub_total) : (price * quantity);

            return {
                id_order: id_order,
                id_product: item.id_product,
                quantity: quantity,
                unit_price: price,
                sub_total: subTotal

            };
        });

        console.log("Itens formatados para o banco:", formatted);

        await OrderItem.bulkCreate(formatted, { transaction: t });
    }

    async createFullOrder(id_people: number, items: ICartItem[], total: number, type_payment: string): Promise<Orders> {
        const t = await sequelize.transaction();
        try {
            const order = await Orders.create({ id_people, total, type_payment }, { transaction: t });

            await this._createItems(order.id_orders, items, t);
            await t.commit();
            return order;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async findAllOrders(limit: number, offset: number): Promise<{ rows: Orders[]; count: number }> {
        return await Orders.findAndCountAll({
            limit,
            offset,
            include: [
                { model: People, as: "people", attributes: ["id_people", "name"] },
                {
                    model: OrderItem, as: "items",
                    include: [{ model: Products, as: "products", attributes: ["id_product", "name", "price"] }]
                }
            ],
            order: [["id_orders", "DESC"]]
        });
    }

    async findByIdOrder(id_orders: number): Promise<Orders | null> {
        return await Orders.findByPk(id_orders, {
            include: [{ model: OrderItem, as: "items", include: [{ model: Products, as: "products" }] }]
        });
    }

    async findOpenOrderByPeople(id_people: number): Promise<Orders | null> {
        return await Orders.findOne({ where: { id_people } });
    }

    async createOrder(id_people: number): Promise<Orders> {
        return await Orders.create({ id_people, total: 0 });
    }

    async updateTotal(id_orders: number, total: number): Promise<[number]> {
        return await Orders.update({ total }, { where: { id_orders } });
    }
}

export default new OrderRepository();