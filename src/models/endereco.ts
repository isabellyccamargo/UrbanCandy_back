import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

class endereco extends Model {
    declare id_endereco: number;
    declare cep: string;
    declare cidade: string;
    declare bairro: string;
    declare rua: string;
    declare complemento: string;
    declare numero: bigint;
};

endereco.init(
    {
        id_endereco: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        cep: {
            type: DataTypes.CHAR(8),
            allowNull: false
        },
        cidade: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        bairro: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        rua: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        complemento: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        numero: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "Endereco",
    tableName: "endereco",
    timestamps: false
}
);

export default endereco;
