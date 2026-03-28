import { DataTypes, Model } from "sequelize";
import sequelize from "../Config/Config.js";

class Orders extends Model {
    declare id_orders: number;
    declare id_people: number;
    declare order_date: Date;
    declare total: number;
    declare id_payment: number;
};

Orders.init(
    {
        id_orders: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        id_people: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        order_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        id_payment: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "Orders",
    tableName: "orders",
    timestamps: false
}
);


export default Orders;
