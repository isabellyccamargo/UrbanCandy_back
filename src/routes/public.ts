import { Router } from "express";
import ProductController from "../Controllers/ProductController.js";
import CategoryController from "../Controllers/CategoryController.js";

const rotas = Router();

// PRODUTO
rotas.get("/produto/listar", ProductController.findAllProduct);

rotas.get("/produto/destaque", ProductController.findFeaturedProducts);

rotas.get("/produto/listarPorId/:id_product", ProductController.findByIdProduct);

rotas.post("/produto/salvar", ProductController.createProduct);

rotas.put("/produto/atualizar/:id_product", ProductController.updateProduct);

rotas.delete("/produto/excluir/:id_product", ProductController.deleteProduct);

// CATEGORIA
rotas.get("/categoria/listar", CategoryController.findAllCategory);

rotas.get("/categoria/listarPorId/:id_category", CategoryController.findByIdCategory);

rotas.post("/categoria/salvar", CategoryController.createCategory);

rotas.put("/categoria/atualizar/:idCategory", CategoryController.updateCategory);

rotas.delete("/categoria/excluir/:id_category", CategoryController.deleteCategory);


export default rotas;