import { error } from "node:console";
import CategoryRepository from "../repositories/CategoryRepository.js";
import { deflate } from "node:zlib";
import Categories from "../models/Categories.js"

class CategoryService {
    //FUNÇÕES AUXILIARES
    private validateName(category: Categories) {
        if (!category.name_category || category.name_category.trim() === "") {
            throw new Error("O nome da categoria é obrigatório!");
        }
    }

    private async verifyNameNotExists(name_category: string, ignoreID?: number) {
        const exists = await CategoryRepository.findByName(name_category);

        if (exists && exists.id_category !== ignoreID) {
            throw new Error("Já existe uma categoria com este nome no sistema!");
        }
    }

    // CRUD - MÉTODOS PRINCIPAIs

    async findAllCategory(page: number = 1, size: number = 10) {
        const limit = size;
        const offset = (page - 1) * size;

        return await CategoryRepository.findAllCategory(limit, offset);
    }

    async findByIdCategory(id_category: number) {
        const category = await CategoryRepository.findByIdCategory(id_category);
        if (!category) throw new Error("Categoria não encontrada.");
        return category;
    }

    async createCategory(category: Categories) {
        this.validateName(category);
        await this.verifyNameNotExists(category.name_category);

        return await CategoryRepository.createCategory(category);
    }

    async updateCategory(category: Categories) {
        if (!category.id_category) throw new Error("O ID é necessário para atualização.");

        this.validateName(category);

        await this.findByIdCategory(category.id_category);

        await this.verifyNameNotExists(category.name_category, category.id_category);

        return await CategoryRepository.updateCategory(category);
    }

    async deleteCategory(id_category: number) {
        await this.findByIdCategory(id_category);


        return await CategoryRepository.deleteCategory(id_category);
    }
}

export default new CategoryService();