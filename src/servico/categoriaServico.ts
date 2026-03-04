import { error } from "node:console";
import categoriaRepositorio from "../repositorio/categoriaRepositorio.js";
import { deflate } from "node:zlib";

class categoriaServico {

    async criarCategoria(nome: string) {
        if (!nome || nome.trim() === "") {
            throw new Error("O nome da categoria é obrigatório!");
        };

        const categoriasExistentes = await categoriaRepositorio.buscarTodasCategorias();
        const jaExiste = categoriasExistentes.find(
            c => c.nome_categoria.toLowerCase() === nome.toLowerCase() // transforma o nome da categoria do banco e o que esta sendo salvo em letra minúscula
        );

        if (jaExiste) throw new Error("Essa categoria já existe no sistema!");

        return await categoriaRepositorio.criarCategoria(nome);
    };

    async buscarTodasCategorias() {
        return await categoriaRepositorio.buscarTodasCategorias();
    };

    async buscarCategroiaPorId(id: number) {
        const categoria = await categoriaRepositorio.buscarCategroiaPorId(id);
        if (!categoria) throw new Error("Categoria não encontrada.");

        return categoria;
    };

    async excluirCategoria(id: number) {
        const existe = await categoriaRepositorio.buscarCategroiaPorId(id);
        if (!existe) throw new Error("Não foi possível excluir, categoria inexistente.");

        return await categoriaRepositorio.excluirCategoria(id);
    };

    async atualizarCategoria(id: number, nome: string) {
        if (!id) throw new Error("O ID da categoria é necessário para a atualização.");
        if (!nome || nome.trim() === "") throw new Error("O novo nome da categoria é obrigatório.");

        const categoriaExistente = await categoriaRepositorio.buscarCategroiaPorId(id);
        if (!categoriaExistente) {
            throw new Error("Categoria não encontrada para atualizar.");
        }

        const todas = await categoriaRepositorio.buscarTodasCategorias();
        const nomeJaEmUso = todas.find(
            c => c.nome_categoria.toLowerCase() === nome.toLowerCase() && c.id_categoria !== id
        );

        if (nomeJaEmUso) throw new Error("Já existe outra categoria com este nome.");

        return await categoriaRepositorio.atualizarCategoria(id, nome);
    }

}

export default new categoriaServico();