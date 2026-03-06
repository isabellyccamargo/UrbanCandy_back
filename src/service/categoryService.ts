import { error } from "node:console";
import categoryRepository from "../repositories/categoryRepository.js";
import { deflate } from "node:zlib";

class categoryService {
    //FUNÇÕES AUXILIARES
    private validateName(nome: string) {
        if (!nome || nome.trim() === "") {
            throw new Error("O nome da categoria é obrigatório!");
        }
    }

    private async verifyNameNotExists(nome: string, idIgnorar?: number) {
        const allCategories = await categoryRepository.findAllCategory();

        const exists = allCategories.find(c => c.nome_categoria.toLowerCase() === nome.toLowerCase());

        if (exists) {
            throw new Error("Já existe uma categoria com este nome no sistema!");
        }
    }

    // CRUD - MÉTODOS PRINCIPAI

    async findAllCategory() {
        return await categoryRepository.findAllCategory();
    }

    async getByIdCategory(id: number) {
        const category = await categoryRepository.getByIdCategory(id);
        if (!category) throw new Error("Categoria não encontrada.");
        return category;
    }

    async createCategory(nome: string) {
        this.validateName(nome);
        await this.verifyNameNotExists(nome);

        return await categoryRepository.createCategory(nome);
    }

    async updateCategory(id: number, nome: string) {
        if (!id) throw new Error("O ID é necessário para atualização.");

        this.validateName(nome);

        await this.getByIdCategory(id);

        await this.verifyNameNotExists(nome, id);

        return await categoryRepository.updateCategory(id, nome);
    }

    async deleteCategory(id: number) {
        await this.getByIdCategory(id);


        return await categoryRepository.deleteCategory(id);
    }
}

export default new categoryService();