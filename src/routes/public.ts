import { Router } from "express";
import ProductController from "../Controllers/ProductController.js";
import CategoryController from "../Controllers/CategoryController.js";
import UserController from "../Controllers/UserController.js";
import PeopleController from "../Controllers/PeopleController.js"

const routes = Router();

// PRODUTO
routes.get("/produto/listar", ProductController.findAllProduct);

routes.get("/produto/destaque", ProductController.findFeaturedProducts);

routes.get("/produto/listarPorId/:id_product", ProductController.findByIdProduct);

routes.post("/produto/salvar", ProductController.createProduct);

routes.put("/produto/atualizar/:id_product", ProductController.updateProduct);

routes.delete("/produto/excluir/:id_product", ProductController.deleteProduct);

routes.get("/category/:categoryName", ProductController.findByCategory);

// CATEGORIA
routes.get("/categoria/listar", CategoryController.findAllCategory);

routes.get("/categoria/listarPorId/:id_category", CategoryController.findByIdCategory);

routes.post("/categoria/salvar", CategoryController.createCategory);

routes.put("/categoria/atualizar/:idCategory", CategoryController.updateCategory);

routes.delete("/categoria/excluir/:id_category", CategoryController.deleteCategory);

// USUÁRIO
routes.get("/usuario/listar", UserController.findAllUsers);

routes.get("/usuario/listar", UserController.findByIdUser);

routes.post("/usuario/salvar", UserController.createUser);

routes.delete("/usuario/excluir/:id_user", UserController.deleteUser);

// PESSOA 
routes.get("/pessoa/listar", PeopleController.findAllPeople);

routes.get("/pessoa/listarPorId/:id_people", PeopleController.findByIdPeople);

routes.put("/pessoa/atualizar/:id_people", PeopleController.updatePeople);

export default routes;