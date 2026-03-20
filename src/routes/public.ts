import { Router } from "express";
import ProductController from "../Controllers/ProductController.js";
import CategoryController from "../Controllers/CategoryController.js";
import UserController from "../Controllers/UserController.js";
import PeopleController from "../Controllers/PeopleController.js";
import OrderController from "../Controllers/OrderController.js";

const routes = Router();

// --- ROTAS DE LOGIN E CADASTRO (Públicas )
routes.post("/login", UserController.login); 
routes.post("/usuario/salvar", UserController.createUser);

// --- PRODUTO ---
routes.get("/produto/listar", ProductController.findAllProduct);
routes.get("/produto/destaque", ProductController.findFeaturedProducts);
routes.get("/produto/listarPorId/:id_product", ProductController.findByIdProduct);
routes.get("/produto/categoria/:categoryName", ProductController.findByCategory);
// Admin ou logado (No Front você esconde os botões)
routes.post("/produto/salvar", ProductController.createProduct);
routes.put("/produto/atualizar/:id_product", ProductController.updateProduct);
routes.delete("/produto/excluir/:id_product", ProductController.deleteProduct);

// --- CATEGORIA ---
routes.get("/categoria/listar", CategoryController.findAllCategory);
routes.get("/categoria/listarPorId/:id_category", CategoryController.findByIdCategory);
routes.post("/categoria/salvar", CategoryController.createCategory);
routes.put("/categoria/atualizar/:idCategory", CategoryController.updateCategory);
routes.delete("/categoria/excluir/:id_category", CategoryController.deleteCategory);

// --- USUÁRIO
routes.get("/usuario/listar", UserController.findAllUsers);
routes.get("/usuario/listarPorId/:id_user", UserController.findByIdUser);
routes.put("/usuario/atualizar/:id_user", UserController.updateUser);

// --- PESSOA ---
routes.get("/pessoa/listar", PeopleController.findAllPeople);
routes.get("/pessoa/listarPorId/:id_people", PeopleController.findByIdPeople);
routes.put("/pessoa/atualizar/:id_people", PeopleController.updatePeople);

routes.post("/pedido/checkout", OrderController.store);
routes.get("/pedido/listar", OrderController.findAllOrders);
routes.get("/pedido/listarPorId/:id_orders",OrderController.findByIdOrder);


export default routes;