import { Router } from "express";
import ProductController from "../Controllers/productController.js";
import CategoryController from "../Controllers/CategoryController.js";

const rotas = Router();

// PRODUTO
rotas.get("/produto/listar", ProductController.findAllProduct);

rotas.get("/produto/listarPorId/:id", ProductController.getByIdProduct);

rotas.post("/produto/salvar", ProductController.createProduct);

rotas.put("/produto/atualizar/:id", ProductController.updateProduct);

rotas.delete("/produto/excluir/:id", ProductController.deleteProduct);

// CATEGORIA
rotas.get("/categoria/listar", CategoryController.findAllCategory);

rotas.get("/categoria/listarPorId/:id_category", CategoryController.findByIdCategory);

rotas.post("/categoria/salvar", CategoryController.createCategory);

rotas.put("/categoria/atualizar/:id_category", CategoryController.updateCategory);

rotas.delete("/categoria/excluir/:id_category", CategoryController.deleteCategory);


export default rotas;