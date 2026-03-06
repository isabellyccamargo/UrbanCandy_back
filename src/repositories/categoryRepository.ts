import Categorias from "../models/categorias.js";

class categoryRepository {

    async findAllCategory() {
        return await Categorias.findAll();
    };

    async getByIdCategory(id: number) {
        return await Categorias.findByPk(id);
    };

    async createCategory(nome: string) {
        return await Categorias.create({ nome_categoria: nome });
    };

    async updateCategory(id: number, nome: string) {
        return await Categorias.update(
            { nome_categoria: nome },
            { where: { id_categoria: id } }
        );
    }

    async deleteCategory(id: number) {
        return await Categorias.destroy({
            where: { id_categoria: id }
        });
    }

}

export default new categoryRepository();