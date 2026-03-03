import { DataTypes, Model } from "sequelize";
import sequelize from "../configuracoes/config.js";

class pedidos extends Model {
    declare id_categoria: number;
    declare id_cliente: number;
    declare data_pedido: Date;
    declare total: number;
};

pedidos.init (
    {
        id_categoria: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        id_cliente: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        data_pedido: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        total: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: "pedidos",
        tableName: "pedidos",
        timestamps: false
    }
);

import cliente from "./pessoas.js";

pedidos.belongsTo(cliente, { foreignKey: "id_pessoa", as: "pessoa" });

export default pedidos;
