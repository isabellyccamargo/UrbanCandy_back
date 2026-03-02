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
rotas.get("/categoria/listar", categoriaControlador.buscaTodasCategorias);

rotas.get("/categoria/listarPorId", categoriaControlador.buscaCategoriaPorId);

rotas.post("/categoria/salvar", categoriaControlador.salvaCategoria);

rotas.put("/categoria/editar", categoriaControlador.editaCategoria);

rotas.delete("/categoria/excluir", categoriaControlador.excluiCategoria);

// USUÁRIO
rotas.get("/usuario/listar", usuarioControlador.buscaTodosUsuarios);

rotas.get("/usuario/listarPorId", usuarioControlador.buscaUsuarioPorId);

rotas.post("/usuario/salvar", usuarioControlador.salvaUsuario);

rotas.put("/usuario/editar", usuarioControlador.editaUsuario);

rotas.delete("/usuario/excluir", usuarioControlador.excluiUsuario);



export default rotas;