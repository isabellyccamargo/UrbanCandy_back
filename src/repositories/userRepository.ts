import User from "../models/usuarios.js"

export interface userData {
    email: string;
    password: string;
}

class userRepository {
    static async findAll(limit: number = 10, offset: number = 0) {
        return await User.findAll({ limit, offset });
    };

    static async findByIdUser(id: number) {
        return await User.findByPk(id);
    };

    static async findByEmail(email: string) {
        return await User.findOne({ where: { email } });
    };

    static async createUser(userData: userData) {
        return await User.create(userData);
    };

    static async update(id: number, userData: Partial<userData>) {
        return await User.update(userData, {
            where: { id_usuario: id }
        });
    }

    static async delete(id: number) {
        return await User.destroy({
            where: { id_usuario: id }
        });
    }
};

export default userRepository;