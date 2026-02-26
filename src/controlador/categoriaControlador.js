import categoriaServico from "../servico/categoriaServico.js";

async function buscaTodasCategorias(req, res) {
    try {
        const categorias = await categoriaServico.buscaTodasCategorias();
        return res.status(200).json({categorias});
    } catch (error) {
        return res.status(400).json({ error: "Erro ao buscar os produtos" });
    }
}

async function buscaCategoriaPorId(req, res) {
    try {
        return res.status(200).json({ message: "Buscando o produto por ID" });
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

async function salvaCategoria(req, res) {
    try {
        return res.status(201).json({ message: "Salvando produto" });
    } catch (error) {
        return res.status(400).json({ error: "Erro ao buscar o produto" });
    }  
}

async function editaCategoria(req, res) {
    try {
        return res.status(201).json({ message: "Editando produto" });
    } catch (error) {
        return res.status(400).json({ error: "Erro ao buscar o produto" });
    }
}

async function excluiCategoria(req, res) {
    try {
        return res.status(201).json({ message: "Excluindo produto" });
    } catch (error) {
        return res.status(400).json({ error: "Erro ao buscar o produto" });
    }
}

export default {
    buscaTodasCategorias,
    buscaCategoriaPorId,
    salvaCategoria,
    editaCategoria,
    excluiCategoria
}