import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

class usuarios extends Model {
    declare id_usuario: number;
    declare email: string;
    declare senha: string;
    declare administrador: string;
};

usuarios.init(
    {
        id_usuario: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        administrador: {
            type: DataTypes.ENUM('0', '1'),
            allowNull: true,
            defaultValue: '0'
        }
    }, {
    sequelize,
    modelName: "Usuarios",
    tableName: "usuarios",
    timestamps: false
}
);

export default usuarios;
