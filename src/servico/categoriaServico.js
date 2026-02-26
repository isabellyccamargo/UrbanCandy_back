import categoriaRepositorio from "../repositorio/categoriaRepositorio.js";

async function buscaTodasCategorias() {
   const categorias = await categoriaRepositorio.buscaTodasCategorias();

    return categorias;
}

async function buscaCategoriaPorId() {
   const categoria = await categoriaRepositorio.buscaCategoriaPorId();

    return categoria;
}

async function salvaCategoria() {
   const salvarCategoria = await categoriaRepositorio.salvaCategoria();

    return salvarCategoria;
}

async function editaCategoria() {
   const editarCategoria = await categoriaRepositorio.editaCategoria();

    return editarCategoria;
}

async function  excluiCategoria() {
   const excluirCategoria = await categoriaRepositorio.excluiCategoria();

    return excluirCategoria;
}

export default {
    buscaTodasCategorias,
    buscaCategoriaPorId,
    salvaCategoria,
    editaCategoria,
    excluiCategoria
}