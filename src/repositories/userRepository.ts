import User from "../models/usuarios.js"

class userRepository {
    static async findAllUsers() {

        const listaFake = [{ id: 1, nome: "Isabelly" }];

        return listaFake;
    }

    static async getByIdUser() {

        const listaFake = [{ id: 1, nome: "Isabelly" }];

        return listaFake;
    }

    static async createUser() {

        const listaFake = [{ id: 1, nome: "Isabelly" }];

        return listaFake;
    }

    static async updateUser() {

        const listaFake = [{ id: 1, nome: "Isabelly" }];

        return listaFake;
    }

    static async deleteUser() {

        const listaFake = [{ id: 1, nome: "Isabelly" }];

        return listaFake;
    }
};

export default userRepository;