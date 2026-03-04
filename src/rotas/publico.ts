import { Router } from "express";
import produtoControlador from "../controlador/produtoControlador.js";
import usuarioControlador from "../controlador/usuarioControlador.js";
import categoriaControlador from "../controlador/categoriaControlador.js";

const rotas = Router();

// PRODUTO
rotas.get("/produto/listar", produtoControlador.buscaTodosProdutos);

rotas.get("/produto/listarPorId", produtoControlador.buscaProdutoPorId);

rotas.post("/produto/salvar", produtoControlador.salvaProduto);

rotas.put("/produto/editar", produtoControlador.editaProduto);

rotas.delete("/produto/excluir", produtoControlador.excluiProduto);

// CATEGORIA
rotas.get("/categoria/listar", categoriaControlador.buscarTodasCategorias);

rotas.get("/categoria/listarPorId", categoriaControlador.buscarCategroiaPorId);

rotas.post("/categoria/salvar", categoriaControlador.criarCategoria);

rotas.put("/categoria/editar/:id_categoria", categoriaControlador.atualizarCategoria);

rotas.delete("/categoria/excluir/:id_categoria", categoriaControlador.excluirCategoria);

// USUÁRIO
rotas.get("/usuario/listar", usuarioControlador.buscaTodosUsuarios);

rotas.get("/usuario/listarPorId", usuarioControlador.buscaUsuarioPorId);

rotas.post("/usuario/salvar", usuarioControlador.salvaUsuario);

rotas.put("/usuario/editar", usuarioControlador.editaUsuario);

rotas.delete("/usuario/excluir", usuarioControlador.excluiUsuario);



export default rotas;