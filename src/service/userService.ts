import userRepository from "../repositories/userRepository.js";

class userService {
    static async findAllUsers() {
        const usuarios = await userRepository.findAllUsers();

        return usuarios;
    };

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

