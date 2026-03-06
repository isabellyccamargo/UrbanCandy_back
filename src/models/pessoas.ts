import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

class pessoa extends Model {
    declare id_pessoa: number;
    declare nome: string;
    declare cpf: string;
    declare telefone: string;
    declare id_usuario: number;
    declare id_endereco: number;
};

pessoa.init(
    {
        id_pessoa: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        cpf: {
            type: DataTypes.CHAR(11),
            allowNull: false,
            unique: true
        },
        telefone: {
            type: DataTypes.CHAR(13),
            allowNull: true
        },
        id_usuario: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            //  relacionamento depois
        },
        id_endereco: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
            //relacionamento depois
        }
    }, {
    sequelize,
    modelName: "Pessoa",
    tableName: "pessoas",
    timestamps: false

}
);

import Endereco from "./endereco.js";
import Usuario from "./usuarios.js";

pessoa.belongsTo(Endereco, { foreignKey: "id_endereco", as: "endereco" });
pessoa.belongsTo(Usuario, { foreignKey: "id_usuario", as: "usuario" });

export default pessoa;
