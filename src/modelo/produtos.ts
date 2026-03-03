import { DataTypes, Model } from "sequelize";
import sequelize from "../configuracoes/config.js";

class produtos extends Model {
    declare id_produto: number;
    declare nome: string;
    declare descricao: string;
    declare preco: number;
    declare quantidade: number;
    declare imagem: string;
    declare id_categoria: bigint;
};

produtos.init (
    {
        id_produto: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        preco: {
            type:DataTypes.DECIMAL(10,2),
            allowNull: true
         },
        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        imagem: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        id_categoria: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "produtos",
        tableName: "produtos",
        timestamps: false
    }
);

import categorias from "./categorias.js";

produtos.belongsTo(categorias, { foreignKey: "id_categoria", as: "categoria" });

export default produtos;
