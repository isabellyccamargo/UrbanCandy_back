import produtoRepositorio from "../repositorio/produtoRepositorio.js";

async function buscaTodosProdutos() {
   const produtos = await produtoRepositorio.buscaTodosProdutos();

    return produtos;
}

async function buscaProdutoPorId(id: number) {
   const produto = await produtoRepositorio.buscaProdutoPorId();

    return produto;
}

async function salvaProduto() {
   const salvarProduto = await produtoRepositorio.salvaProduto();

    return salvarProduto;
}

async function editaProduto() {
   const editarProduto = await produtoRepositorio.editaProduto();

    return editarProduto;
}

async function excluiProduto() {
   const excluirProduto = await produtoRepositorio.excluiProduto();

    return excluirProduto;
}

export default {
    buscaTodosProdutos,
    buscaProdutoPorId,
    salvaProduto,
    editaProduto,
    excluiProduto
}