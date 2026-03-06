import { type Request, type Response } from "express";
import categoryService from "../service/categoryService.js";

class categoryController {

    static async findAllCategory(req: Request, res: Response) {
        try {
            const categories = await categoryService.findAllCategory();
            res.send(categories);
        } catch (error: unknown) {
            res.status(500).send({ mensagem: "Erro ao buscar categorias." });
        }
    }

    static async getByIdCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const categories = await categoryService.getByIdCategory(Number(id));
            res.send(categories);
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Categoria não encontrada";
            res.status(404).send({ mensagem });
        }
    }

    static async createCategory(req: Request, res: Response) {
        try {
            const { nome_categoria } = req.body;
            const newCategory = await categoryService.createCategory(nome_categoria);

            res.status(201).send(newCategory);
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Erro ao criar categoria";
            res.status(400).send({ mensagem });
        }
    }

    static async updateCategory(req: Request, res: Response) {
        try {
            const { id_categoria } = req.params;
            const { nome_categoria } = req.body;
          
            await categoryService.updateCategory(Number(id_categoria), nome_categoria);

            res.send({ mensagem: "Categoria atualizada com sucesso!" });
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Erro ao atualizar categoria";
            res.status(400).send({ mensagem });
        }
    }

    static async deleteCategory(req: Request, res: Response) {
        try {
            const { id_categoria } = req.params;
            
            await categoryService.deleteCategory(Number(id_categoria));
            res.status(204).send();
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Erro ao excluir categoria";
            res.status(400).send({ mensagem });
        }
    }

}

export default categoryController;