import ProductRepository from "../repositories/ProductRepository.js";
import CategoryRepository from "../repositories/CategoryRepository.js";
import Products from "../models/Products.js";

class ProdutoServico {
    // Função auxiliar
    private validateData(p: Products): void {
        if (!p.name?.trim()) throw new Error("O nome do produto é obrigatório.");
        if (p.price <= 0) throw new Error("O preço deve ser um valor positivo.");
        if (p.stock_number < 0) throw new Error("O estoque não pode ser negativo.");
        if (!p.id_category) throw new Error("O produto deve ter uma categoria.");
    }

    // Metodos CRUDS
    async findAllProduct(page: number = 1, size: number = 10) {
        const limit = size;
        const offset = (page - 1) * size;
        return await ProductRepository.findAllProduct(limit, offset);
    }

    async findFeaturedProducts(page: number = 1, size: number = 10) {
        const limit = size;
        const offset = (page - 1) * size;
        return await ProductRepository.findFeaturedProducts(limit, offset);
    }

    async findByIdProduct(id_product: number) {
        if (!id_product) throw new Error("ID inválido para busca.");

        const product = await ProductRepository.findByIdProduct(id_product);
        if (!product) throw new Error("Produto não encontrado.");
        return product;
    }

    async createProduct(product: Products) {
        this.validateData(product);
        const category = await CategoryRepository.findByIdCategory(Number(product.id_category));
        if (!category) throw new Error("A categoria informada não existe.");
        return await ProductRepository.createProduct(product);
    }

    async updateProduct(product: Products) {
        await this.findByIdProduct(product.id_product);
        this.validateData(product);
        return await ProductRepository.updateProduct(product);
    }

    async deleteProduct(id: number) {
        await this.findByIdProduct(id);
        return await ProductRepository.deleteProduct(id);
    }
}

export default new ProdutoServico();