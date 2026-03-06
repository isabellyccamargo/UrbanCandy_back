import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

class itemPedido extends Model {
    declare id_itemPedido: string;
    declare id_pedido: number;
    declare id_produto: number;
    declare quantidade: number;
    declare preco_unitario: number;
    declare sub_total: Number;
};

itemPedido.init(
    {
        id_itemPedido: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        id_pedido: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        id_produto: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        quantidade: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        preco_unitario: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        sub_total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "ItemPedido",
    tableName: "item_pedido",
    timestamps: false
}
);

import pedidos from "./pedidos.js";
import produtos from "./produtos.js";

itemPedido.belongsTo(pedidos, { foreignKey: "id_pedido", as: "pedidos" });
itemPedido.belongsTo(produtos, { foreignKey: "id_produto", as: "produtos" });

export default itemPedido;
