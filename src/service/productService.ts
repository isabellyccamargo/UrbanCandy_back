import productRepository from "../repositories/productRepository.js";
import CategoryRepository from "../repositories/CategoryRepository.js";

interface dataProduct {
    nome: string,
    descricao: string;
    preco: number;
    quantidade: number;
    imagem: string;
    id_categoria: number;
};

class produtoServico {

    static async findAllProduct() {
        return await productRepository.findAllProduct();
    }

    async getByIdProduct(id: number) {
        if (!id) throw new Error("ID inválido para busca.");

        const product = await productRepository.getByIdProduct(id);
        if (!product) throw new Error("Produto não encontrado.");

        return product;
    }

    async createProduct(data: dataProduct) {
        this.ValidateRequiredData(data);

        const categoryExists = await CategoryRepository.findByIdCategory(data.id_categoria);
        if (!categoryExists) {
            throw new Error("A categoria informada para  produto não existe.");
        }

        return await productRepository.createProduct(data);
    }

    async updateProduct(id: number, data: Partial<dataProduct>) {
        await this.getByIdProduct(id);

        return await productRepository.updateProduct(id, data);
    }

    async deleteProduct(id: number) {
        await this.getByIdProduct(id);

        return await productRepository.deleteProduct(id);
    }

    private ValidateRequiredData(data: dataProduct): void {
        if (!data.nome || data.nome.trim() === "") throw new Error("O nome do produto é obrigatório.");
        if (!data.descricao || data.descricao.trim() === "") throw new Error("A descrição é obrigatória.");
        if (data.preco <= 0) throw new Error("O preço deve ser um valor positivo.");
        if (data.quantidade < 0) throw new Error("A quantidade não pode ser negativa.");
        if (!data.imagem || data.imagem.trim() === "") throw new Error("O link da imagem é obrigatório.");
        if (!data.id_categoria) throw new Error("O produto deve pertencer a uma categoria.");
    }
}

export default new produtoServico();