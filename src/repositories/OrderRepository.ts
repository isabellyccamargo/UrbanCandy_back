import Orders from "../Models/Orders.js";
import People from "../Models/People.js";
import OrderItem from "../Models/OrderItem.js";
import Products from "../Models/Products.js";
import sequelize from "../Config/Config.js";
import { Transaction } from "sequelize";
import TypeOfPayment from "../Models/TypeOfPayment.js";

interface ICartItem {
    id_product: number;
    quantity: number;
    sub_total: number;
    products: {
        price: number;
        name: string;
    };
}

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

    async createFullOrder(id_people: number, items: ICartItem[], total: number, id_payment: number): Promise<Orders> {
        const t = await sequelize.transaction();
        try {
            console.log("--- TENTANDO CRIAR PEDIDO ---");
            const order = await Orders.create({
                id_people: Number(id_people),
                total: Number(total),
                id_payment: Number(id_payment),
            }, { transaction: t });

            console.log("Pedido criado ID:", order.id_orders);

            await this._createItems(order.id_orders, items, t);

            await t.commit();
            return order;
        } catch (error: any) {
            await t.rollback();
            console.error("ERRO AO CRIAR PEDIDO:", error.name, error.message);
            throw error;
        }
    }

    async findAllOrders(limit: number, offset: number): Promise<{ rows: Orders[]; count: number }> {
        return await Orders.findAndCountAll({
            limit: Number(limit),
            offset: Number(offset),
            distinct: true,        
            col: 'id_orders',        
            include: [
                {
                    model: People,
                    as: "people",
                    attributes: ["id_people", "name"]
                },
                {
                    model: TypeOfPayment,
                    as: "paymentType",
                    attributes: ["name_payment"]
                },
                {
                    model: OrderItem,
                    as: "items",
                    include: [
                        {
                            model: Products,
                            as: "products",
                            attributes: ["id_product", "name", "description", "price"]
                        }
                    ]
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