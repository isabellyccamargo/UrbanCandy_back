import { DataTypes, Model } from "sequelize";
import sequelize from "../Config/Config.js";

class Orders extends Model {
    declare id_orders: number;
    declare id_people: number;
    declare order_date: Date;
    declare total: number;
    declare type_payment: string;
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
        type_payment: {
            type: DataTypes.STRING(50),
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
