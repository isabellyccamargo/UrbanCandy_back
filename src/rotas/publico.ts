import { Router } from "express";
import produtoControlador from "../controlador/produtoControlador.js";
import usuarioControlador from "../controlador/usuarioControlador.js";
import categoriaControlador from "../controlador/categoriaControlador.js";

const rotas = Router();

// PRODUTO
rotas.get("/produto/listar", produtoControlador.buscarTodosProdutos);

rotas.get("/produto/listarPorId/:id", produtoControlador.buscarProdutoPorId);

rotas.post("/produto/salvar", produtoControlador.criarProduto);

rotas.put("/produto/atualizar/:id", produtoControlador.atualizarProduto);

rotas.delete("/produto/excluir/:id", produtoControlador.excluirProduto);

// CATEGORIA
rotas.get("/categoria/listar", categoriaControlador.buscarTodasCategorias);

rotas.get("/categoria/listarPorId/:id", categoriaControlador.buscarCategroiaPorId);

rotas.post("/categoria/salvar", categoriaControlador.criarCategoria);

rotas.put("/categoria/atualizar/:id_categoria", categoriaControlador.atualizarCategoria);

rotas.delete("/categoria/excluir/:id_categoria", categoriaControlador.excluirCategoria);


export default rotas;