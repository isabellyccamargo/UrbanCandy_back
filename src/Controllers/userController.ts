import { type Request, type Response } from "express";
import UserService from "../Service/UserService.js";
import Users from "../Models/Users.js";
import People from "../Models/People.js";

class UserController {
    static async findAllUsers(req: Request, res: Response) {
        try {
            const { page, size } = req.query;
            const pageNumber = Number(page) || 1;
            const sizeNumber = Number(size) || 10;

            const result = await UserService.findAllUsers(pageNumber, sizeNumber);

            res.send({
                totalItems: result.count,
                totalPages: Math.ceil(result.count / sizeNumber),
                currentPage: pageNumber,
                data: result.rows
            });
        } catch (error: any) {
            res.status(500).send({ mensagem: "Erro ao buscar usuários." });
        }
    }

    static async findByIdUser(req: Request, res: Response) {
        try {
            const { id_user } = req.params;
            const user = await UserService.findByIdUser(Number(id_user));
            res.status(200).send(user); 
        } catch (error: any) {
            res.status(404).send({ mensagem: error.message });
        }
    }

    static async createUser(req: Request, res: Response) {
        try {
            const userInstance = Users.build(req.body);
            const peopleInstance = People.build(req.body);

            const newUser = await UserService.createUser(userInstance, peopleInstance);
            res.status(201).send({ mensagem: "Usuário e Pessoa cadastrados com sucesso!", id: newUser.id_user });
        } catch (error: any) {
            res.status(400).send({ mensagem: error.message });
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const { id_user } = req.params;
            await UserService.deleteUser(Number(id_user));
            res.status(204).send();
        } catch (error: any) {
            res.status(400).send({ mensagem: error.message });
        }
    }
}

export default UserController;