import Products from "../models/Products.js";
import Categories from "../models/Categories.js"

class ProductRepository {

    async findAllProduct(limit: number, offset: number) {
        return await Products.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['id_product', 'ASC']],
            include: [{ model: Categories, as: "category" }] 
        });
    };

    async findByIdProduct(id_product: number) {
       return await Products.findByPk(id_product, {
            include: [{ model: Categories, as: "category" }]
        });
    };

    async createProduct(product: Products) {
        return await product.save();;
    };

    async updateProduct(product: Products) {
        return await Products.update(
            { 
                name: product.name,
                description: product.description,
                price: product.price,
                stock_number: product.stock_number,
                image: product.image,
                id_category: product.id_category
            },
            { 
                where: { id_product: product.id_product } 
            }
        );
    };

    async deleteProduct(id_product: number) {
        return await Products.destroy({ where: { id_product: id_product } });
    };

}

export default new ProductRepository();