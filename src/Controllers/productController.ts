import { type Request, type Response } from "express";
import productService from "../service/productService.js";

class productController {

    static async findAllProduct(req: Request, res: Response): Promise<void> {
        try {
            const products = await productService.findAllProduct();
            res.status(200).send(products);
        } catch (error: unknown) {
            res.status(500).send({ message: "Erro interno ao buscar produtos" });
        }
    }

    static async getByIdProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const product = await productService.getByIdProduct(Number(id));
            res.status(200).send(product);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Produto não encontrado";
            res.status(404).send({ message });
        }
    }

    static async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const { nome, descricao, preco, quantidade, imagem, id_categoria } = req.body;

            const newProducts = await productService.createProduct({
                nome,
                descricao,
                preco,
                quantidade,
                imagem,
                id_categoria
            });

            res.status(201).send(newProducts);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao salvar produto";
            res.status(400).send({ message });
        }
    }

    static async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data = req.body;

            await productService.updateProduct(Number(id), data);
            res.status(200).send({ message: "Produto atualizado com sucesso!" });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao editar produto";
            res.status(400).send({ message });
        }
    }

    static async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await productService.deleteProduct(Number(id));

            res.status(204).send();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao excluir produto";
            res.status(400).send({ message });
        }
    }
}

export default productController;