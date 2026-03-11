import userService from "../service/UserService.js";
import { type Request, type Response } from "express";

class userController {
    static async findAllUsers(req: Request, res: Response) {
        try {
            const usuarios = await userService.findAllUsers();
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(400).json({ error: "Erro ao buscar os usuários" });
        };
    };

    static async getByIdUser(req: Request, res: Response) {
        try {
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).json({ error: "Erro ao buscar o usuário" });
        };
    };

    static async createUser(req: Request, res: Response) {
        try {
            return res.status(201).json({});
        } catch (error) {
            return res.status(400).json({ error: "Erro ao salvar os usuários" });
        };
    };

    static async updateUser(req: Request, res: Response) {
        try {
            return res.status(201).json({});
        } catch (error) {
            return res.status(400).json({ error: "Erro ao editar os usuários" });
        };
    };

    static async deleteUser(req: Request, res: Response) {
        try {
            return res.status(201).json({});
        } catch (error) {
            return res.status(400).json({ error: "Erro ao excluir os usuários" });
        };
    };
};

export default userController;