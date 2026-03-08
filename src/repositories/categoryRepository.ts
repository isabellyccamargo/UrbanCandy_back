import Categories from "../models/Categories.js";

class CategoryRepository {

    async findAllCategory() {
        return await Categories.findAll();
    };

    async findByIdCategory(id_category: number) {
        return await Categories.findByPk(id_category);
    };

    async findByName(name_category: string) {
        return await Categories.findOne({
            where: { name_category: name_category }
        });
    }

    async createCategory(category: Categories) {
        return await category.save();
    };

    async updateCategory(category: Categories) {
        return await Categories.update(
            { name_category: category.name_category },
            {
                where: { id_category: category.id_category}
            }
        );
    }

    async deleteCategory(id_category: number) {
        return await Categories.destroy({
            where: { id_category: id_category }
        });
    }

}

export default new CategoryRepository();