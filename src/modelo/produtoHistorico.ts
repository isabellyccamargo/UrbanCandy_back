import { DataTypes, Model } from "sequelize";
import sequelize from "../configuracoes/config.js";

class produtoHistorico extends Model {
    declare id_historico: string;
    declare data: Date;
    declare operacao: string;
    declare valor_antigo: string;
    declare valor_atual: string;
    declare id_produto: number;
    declare campo_bigint: string;
};

produtoHistorico.init (
    {
        id_historico: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false
        },
        operacao: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        valor_antigo: {
            type:DataTypes.STRING(255),
            allowNull: true
         },
        valor_atual: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        id_produto: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        campo_bigint: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "produtoHistorico",
        tableName: "produto_historico",
        timestamps: false
    }
);

import produto from "./produtos.js";

produtoHistorico.belongsTo(produto, { foreignKey: "id_produto", as: "produto" });

export default produtoHistorico;
