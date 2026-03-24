import { error } from "node:console";
import CategoryRepository from "../Repositories/CategoryRepository.js";
import { deflate } from "node:zlib";
import Categories from "../Models/Categories.js"
import { ApiException } from "../Exception/ApiException.js";

class CategoryService {
    
    private validateName(category: Categories): void {
        if (!category.name_category || category.name_category.trim() === "") {
            throw new ApiException("INVALID_CATEGORY_NAME", 400);
        }
    }

    private async verifyNameNotExists(category: Categories, CategoryID?: number): Promise<void> {
        const categoryEntity = await CategoryRepository.findByName(category.name_category);
        if (categoryEntity && categoryEntity.id_category !== CategoryID) {
            throw new ApiException("CATEGORY_ALREADY_EXISTS", 409);
        }
    }

    async findAllCategory(page: number = 1, size: number = 10): Promise<{ rows: Categories[]; count: number }> {
        const limit = size;
        const offset = (page - 1) * size;
        return await CategoryRepository.findAllCategory(limit, offset);
    }

    async findByIdCategory(categoryId: number): Promise<Categories> {
        const category = await CategoryRepository.findByIdCategory(categoryId);
        if (!category) throw new ApiException("CATEGORY_NOT_FOUND", 404, categoryId);
        return category;
    }

    async createCategory(category: Categories): Promise<Categories> {
        this.validateName(category);
        await this.verifyNameNotExists(category);
        return await CategoryRepository.createCategory(category);
    }

    async updateCategory(idCategory: number, category: Categories): Promise<[number]> {
        if (!idCategory) throw new ApiException("INVALID_CATEGORY_ID", 400);
        this.validateName(category);
        await this.findByIdCategory(idCategory);
        await this.verifyNameNotExists(category, idCategory);
        return await CategoryRepository.updateCategory(idCategory, category);
    }

    async deleteCategory(id_category: number): Promise<number> {
        await this.findByIdCategory(id_category);
        return await CategoryRepository.deleteCategory(id_category);
    }
}

export default new CategoryService();