import { DataTypes, Model } from "sequelize";
import sequelize from "../Config/Config.js";

class OrderItem extends Model {
    declare id_orderItem: number;
    declare id_pedido: number;
    declare id_produto: number;
    declare quantity: number;
    declare unit_price: number;
    declare sub_total: Number;
};

OrderItem.init(
    {
        id_orderItem: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        id_order: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        id_product: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        unit_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        sub_total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "OrderItem",
    tableName: "order_item",
    timestamps: false
}
);

import pedidos from "./Orders.js";
import produtos from "./Products.js";

OrderItem.belongsTo(pedidos, { foreignKey: "id_order", as: "orders" });
OrderItem.belongsTo(produtos, { foreignKey: "id_product", as: "products" });

export default OrderItem;
