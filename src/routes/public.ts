import { Router } from "express";
import productController from "../Controllers/productController.js";
import categoryController from "../Controllers/categoryController.js";

const rotas = Router();

// PRODUTO
rotas.get("/produto/listar", productController.findAllProduct);

rotas.get("/produto/listarPorId/:id", productController.getByIdProduct);

rotas.post("/produto/salvar", productController.createProduct);

rotas.put("/produto/atualizar/:id", productController.updateProduct);

rotas.delete("/produto/excluir/:id", productController.deleteProduct);

// CATEGORIA
rotas.get("/categoria/listar", categoryController.findAllCategory);

rotas.get("/categoria/listarPorId/:id", categoryController.getByIdCategory);

rotas.post("/categoria/salvar", categoryController.createCategory);

rotas.put("/categoria/atualizar/:id_categoria", categoryController.updateCategory);

rotas.delete("/categoria/excluir/:id_categoria", categoryController.deleteCategory);


export default rotas;