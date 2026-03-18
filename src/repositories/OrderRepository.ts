import Orders from "../Models/Orders.js";
import People from "../Models/People.js";
import OrderItem from "../Models/OrderItem.js";
import Products from "../Models/Products.js";

class OrderRepository {

    async findAllOrders(limit: number, offset: number) {
        return await Orders.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: People,
                    as: "people",
                    attributes: ["id_people", "name"]
                },
                {
                    model: OrderItem,
                    as: "items",
                    include: [
                        {
                            model: Products,
                            as: "products",
                            attributes: ["id_product", "name", "price"]
                        }
                    ]
                }
            ],
            order: [["id_orders", "DESC"]]
        });
    }

    async findByIdOrder(id_orders: number) {
        return await Orders.findByPk(id_orders, {
            include: [
                {
                    model: OrderItem,
                    as: "items",
                    include: [
                        {
                            model: Products,
                            as: "products"
                        }
                    ]
                }
            ]
        });
    }

    async findOpenOrderByPeople(id_people: number) {
        return await Orders.findOne({
            where: { id_people }
        });
    }

    async createOrder(id_people: number) {
        return await Orders.create({
            id_people,
            total: 0
        });
    }

    async updateTotal(id_orders: number, total: number) {
        return await Orders.update(
            { total },
            { where: { id_orders } }
        );
    }

}

export default new OrderRepository();