import userRepository, { userData } from "../repositories/UserRepository.js";
import bcrypt from "bcrypt";

class userService {
   static async findAllUsers(limit?: number, offset?: number) {
        return await userRepository.findAll(limit, offset);
    }

    static async getByIdUser(id: number) {
        const usuario = await userRepository.getByIdUser();

        return usuario;
    };

    static async createUser() {
        const salvarUsuario = await userRepository.createUser();

        return salvarUsuario;
    }

    static async updateUser() {
        const editarUsuario = await userRepository.updateUser();

        return editarUsuario;
    }

    static async deleteUser() {
        const excluirUsuario = await userRepository.deleteUser();

        return excluirUsuario;
    }
};

export default userService;

