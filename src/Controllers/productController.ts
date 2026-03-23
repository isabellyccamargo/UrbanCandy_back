import { type Request, type Response, type NextFunction } from "express";
import ProductService from "../Service/ProductService.js";
import Products from "../Models/Products.js";
import { ApiException } from "../Exception/ApiException.js";

class ProductController {

    static async findAllProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const page: number = Number(req.query.page) || 1;
            const size: number = Number(req.query.size) || 10;
            const result = await ProductService.findAllProduct(page, size);

            res.status(200).json({
                totalItems: result.count,
                totalPages: Math.ceil(result.count / size),
                currentPage: page,
                data: result.rows
            });
        } catch (error) {
            next(error);
        }
    }

    static async findFeaturedProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const page: number = Number(req.query.page) || 1;
            const size: number = Number(req.query.size) || 10;
            const result = await ProductService.findFeaturedProducts(page, size);

            res.status(200).json({
                totalItems: result.count,
                totalPages: Math.ceil(result.count / size),
                currentPage: page,
                data: result.rows
            });
        } catch (error) {
            next(error);
        }
    }

    static async findByIdProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_product } = req.params;
            if (!id_product || Array.isArray(id_product)) {
                throw new ApiException("INVALID_ID", 400, "id_product");
            }

            const id: number = Number(id_product);
            if (Number.isNaN(id)) {
                throw new ApiException("INVALID_ID", 400, id_product);
            }

            const product = await ProductService.findByIdProduct(id);
            if (!product) {
                throw new ApiException("PRODUCT_NOT_FOUND", 404, id);
            }
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    static async findByCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { categoryName } = req.params;
            if (!categoryName || Array.isArray(categoryName)) {
                throw new ApiException("INVALID_CATEGORY", 400, "categoryName");
            }
            const page: number = Number(req.query.page) || 1;
            const size: number = Number(req.query.size) || 10;
            const result = await ProductService.findByCategory(categoryName, page, size);
            res.status(200).json({
                totalItems: result.count,
                totalPages: Math.ceil(result.count / size),
                currentPage: page,
                data: result.rows
            });
        } catch (error) {
            next(error);
        }
    }
    static async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const dados = req.body;

            const file = (req as any).file;

            if (file) {
                dados.image = file.filename;
            }

            const productInstance = Products.build(dados);
            const newProduct = await ProductService.createProduct(productInstance);
            res.status(201).json(newProduct);
        } catch (error) {
            next(error);
        }
    }
    static async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_product } = req.params;
            if (!id_product || Array.isArray(id_product)) {
                throw new ApiException("INVALID_ID", 400, "id_product");
            }

            const id: number = Number(id_product);
            if (Number.isNaN(id)) {
                throw new ApiException("INVALID_ID", 400, id_product);
            }

            const productInstance = Products.build({
                id_product: id,
                ...req.body
            });
            await ProductService.updateProduct(productInstance);
            res.status(200).json({
                message: "Produto atualizado com sucesso"
            });

        } catch (error) {
            next(error);
        }
    }

    static async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_product } = req.params;
            if (!id_product || Array.isArray(id_product)) {
                throw new ApiException("INVALID_ID", 400, "id_product");
            }

            const id: number = Number(id_product);
            if (Number.isNaN(id)) {
                throw new ApiException("INVALID_ID", 400, id_product);
            }
            await ProductService.deleteProduct(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

}

export default ProductController;