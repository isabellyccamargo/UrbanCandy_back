import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

class categorias extends Model {
    declare id_categoria: number;
    declare nome_categoria: string;
};

categorias.init(
    {
        id_categoria: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        nome_categoria: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "Categorias",
    tableName: "categorias",
    timestamps: false
}
);

export default categorias;
