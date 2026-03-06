import Produtos from "../models/produtos.js";

class productRepository {

    async findAllProduct() {
        return await Produtos.findAll();
    };

    async getByIdProduct(id: number) {
        return await Produtos.findByPk(id);
    };

    async createProduct(data: {
        nome: string,
        descricao: string,
        preco: number,
        quantidade: number,
        imagem: string,
        id_categoria: number
    }) {
        return await Produtos.create(data);
    };

    async updateProduct(id: number, data: object) {
        return await Produtos.update(data, { where: { id_produto: id } });
    };

    async deleteProduct(id: number) {
        return await Produtos.destroy({ where: { id_produto: id } });
    };

}

export default new productRepository();