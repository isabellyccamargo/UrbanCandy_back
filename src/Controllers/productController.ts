import { type Request, type Response } from "express";
import ProductService from "../Service/ProductService.js";
import Products from "../Models/Products.js"

class ProductController {

    static async findAllProduct(req: Request, res: Response): Promise<void> {
        try {
            const page = Number(req.query.page) || 1;
            const size = Number(req.query.size) || 10;

            const result = await ProductService.findAllProduct(page, size);

            res.status(200).send({
                totalItems: result.count,
                totalPages: Math.ceil(result.count / size),
                currentPage: page,
                data: result.rows
            });
        } catch (error: unknown) {
            res.status(500).send({ mensagem: "Erro interno ao buscar produtos" });
        }
    }

    static async findFeaturedProducts(req: Request, res: Response): Promise<void> {
        try {
            const page = Number(req.query.page) || 1;
            const size = Number(req.query.size) || 10;

            const result = await ProductService.findFeaturedProducts(page, size);

            res.status(200).send({
                totalItems: result.count,
                totalPages: Math.ceil(result.count / size),
                currentPage: page,
                data: result.rows
            });
        } catch (error: unknown) {
            res.status(500).send({ mensagem: "Erro interno ao buscar produtos em destaque" });
        }
    }

    static async findByIdProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id_product } = req.params;
            const product = await ProductService.findByIdProduct(Number(id_product));
            res.status(200).send(product);
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Produto não encontrado";
            res.status(404).send({ mensagem });
        }
    }

    static async createProduct(req: Request, res: Response): Promise<void> {
        try {

            const productInstance = Products.build(req.body);
            const newProduct = await ProductService.createProduct(productInstance);

            res.status(201).send(newProduct);
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Erro ao salvar produto";
            res.status(400).send({ mensagem });
        }
    }

    static async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id_product } = req.params;
            const productInstance = Products.build({
                id_product: Number(id_product),
                ...req.body
            });

            await ProductService.updateProduct(productInstance);
            res.status(200).send({ mensagem: "Produto atualizado com sucesso!" });
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Erro ao editar produto";
            res.status(400).send({ mensagem });
        }
    }

    static async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id_product } = req.params;
            await ProductService.deleteProduct(Number(id_product));
            res.status(204).send();
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Erro ao excluir produto";
            res.status(400).send({ mensagem });
        }
    }
}

export default ProductController;