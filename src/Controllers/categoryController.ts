import { type Request, type Response } from "express";
import CategoryService from "../service/CategoryService.js";
import Categories from "../models/Categories.js"

class CategoryController {

    static async findAllCategory(req: Request, res: Response) {
        try {
            const { page, size } = req.query;

            const pageNumber = Number(page) || 1;
            const sizeNumber = Number(size) || 10;

            const result = await CategoryService.findAllCategory(pageNumber, sizeNumber);

            res.send({
                totalItems: result.count,
                totalPages: Math.ceil(result.count / sizeNumber),
                currentPage: pageNumber,
                data: result.rows
            });
        } catch (error: unknown) {
            res.status(500).send({ mensagem: "Erro ao buscar categorias." });
        }

    }


    static async findByIdCategory(req: Request, res: Response) {
        try {
            const { id_category } = req.params;
            const categories = await CategoryService.findByIdCategory(Number(id_category));
            res.send(categories);
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Categoria não encontrada";
            res.status(404).send({ mensagem });
        }
    }

    static async createCategory(req: Request, res: Response) {
        try {
            const categoryInstance = Categories.build(req.body);
            const newCategory = await CategoryService.createCategory(categoryInstance);

            res.status(201).send(newCategory);
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Erro ao criar categoria";
            res.status(400).send({ mensagem });
        }
    }

    static async updateCategory(req: Request, res: Response) {
        try {
            const { id_category } = req.params;

            const categoryInstance = Categories.build({
                id_category: Number(id_category),
                ...req.body
            });

            await CategoryService.updateCategory(categoryInstance);

            res.send({ mensagem: "Categoria atualizada com sucesso!" });
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Erro ao atualizar categoria";
            res.status(400).send({ mensagem });
        }
    }

    static async deleteCategory(req: Request, res: Response) {
        try {
            const { id_category } = req.params;

            await CategoryService.deleteCategory(Number(id_category));
            res.status(204).send({ mensagem: "Categoria excluida com sucesso!" });
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Erro ao excluir categoria";
            res.status(400).send({ mensagem });
        }
    }
}

export default CategoryController;