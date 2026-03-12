import UserRepository from "../Repositories/UserRepository.js";
import Users from "../Models/Users.js";
import People from "../Models/People.js";
import bcrypt from "bcrypt";

class UserService {
    // FUNÇÃO AUXILIARES
    private validateEmail(email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) throw new Error("Formato de e-mail inválido! ");
    }

    private validateCPF(cpf: string) {
        if (!cpf || cpf.length !== 11) throw new Error("CPF deve conter 11 dígitos! ");
    }

    // CRUD PRINCIPAL
    async findAllUsers(page: number = 1, size: number = 10) {
        const limit = size;
        const offset = (page - 1) * size;
        return await UserRepository.findAllUsers(limit, offset);
    }

    async createUser(userInstance: Users, personInstance: People) {
        this.validateEmail(userInstance.email);
        this.validateCPF(personInstance.cpf);
        if (!userInstance.password || userInstance.password.length < 6) throw new Error("Senha fraca!");

        if (await UserRepository.findByEmail(userInstance.email)) throw new Error("E-mail já cadastrado!");
        if (await UserRepository.findByCpf(personInstance.cpf)) throw new Error("CPF já cadastrado!");

        const salt = await bcrypt.genSalt(10);
        userInstance.password = await bcrypt.hash(userInstance.password, salt);

        return await UserRepository.createUser(userInstance, personInstance);
    }

    async findByIdUser(id_user: number) {
        const user = await UserRepository.findByIdUser(id_user);
        if (!user) throw new Error("Usuário não encontrado.");
        return user;
    }

    async deleteUser(id_user: number) {
        await this.findByIdUser(id_user);
        return await UserRepository.deleteUser(id_user);
    }
}

export default new UserService();