import { type Request, type Response } from "express";
import categoriaServico from "../servico/categoriaServico.js";

async function buscaTodasCategorias(req: Request, res: Response) {
    try {
        const categorias = await categoriaServico.buscaTodasCategorias();
        return res.status(200).json({ categorias });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao buscar as categorias" });
    }
}

async function buscaCategoriaPorId(req: Request, res: Response) {
    try {
        return res.status(200).json({ message: "Buscando a categoria por ID" });
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

async function salvaCategoria(req: Request, res: Response) {
    try {
        return res.status(201).json({ message: "Salvando categoria" });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao salvar categoria" });
    }  
}

async function editaCategoria(req: Request, res: Response) {
    try {
        return res.status(201).json({ message: "Editando categoria" });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao editar categoria" });
    }
}

async function excluiCategoria(req: Request, res: Response) {
    try {
        return res.status(201).json({ message: "Excluindo categoria" });
    } catch (error: any) {
        return res.status(400).json({ error: "Erro ao excluir categoria" });
    }
}

export default {
    buscaTodasCategorias,
    buscaCategoriaPorId,
    salvaCategoria,
    editaCategoria,
    excluiCategoria
};