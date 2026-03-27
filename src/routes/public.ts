// src/Routes/PublicRoutes.ts
import { Router } from "express";
import ProductController from "../Controllers/ProductController.js";
import CategoryController from "../Controllers/CategoryController.js";
import UserController from "../Controllers/UserController.js";
import privateRoutes from "./Private.js"; 

const routes = Router();

// --- LOGIN E CADASTRO ---
routes.post("/login", UserController.login);
routes.post("/usuario/salvar", UserController.createUser);

// --- PRODUTO  ---
routes.get("/produto/listar", ProductController.findAllProduct);
routes.get("/produto/destaque", ProductController.findFeaturedProducts);
routes.get("/produto/listarPorId/:id_product", ProductController.findByIdProduct);
routes.get("/produto/categoria/:categoryName", ProductController.findByCategory);

// --- CATEGORIA---
routes.get("/categoria/listar", CategoryController.findAllCategory);
routes.get("/categoria/listarPorId/:id_category", CategoryController.findByIdCategory);

// Acopla as rotas que exigem token
routes.use(privateRoutes); 

export default routes;