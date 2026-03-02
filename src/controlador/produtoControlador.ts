import produtoServico from "../servico/produtoServico.js";
import { type Request, type Response } from "express";

async function buscaTodosProdutos(req: Request, res: Response) {
    try {
        const produtos = await produtoServico.buscaTodosProdutos();
        return res.status(200).json({produtos});
    } catch (error) {
        return res.status(400).json({ error: "Erro ao buscar os produtos" });
    }
}

async function buscaProdutoPorId(req: Request, res: Response) {
    try {
        return res.status(200).json({ message: "Buscando o produto por ID" });
    } catch (error) {
        return res.status(400).json({});
    }
}

async function salvaProduto(req: Request, res: Response) {
    try {
        return res.status(201).json({ message: "Salvando produto" });
    } catch (error) {
        return res.status(400).json({ error: "Erro ao buscar o produto" });
    }  
}

async function editaProduto(req: Request, res: Response) {
    try {
        return res.status(201).json({ message: "Editando produto" });
    } catch (error) {
        return res.status(400).json({ error: "Erro ao buscar o produto" });
    }
}

async function excluiProduto(req: Request, res: Response) {
    try {
        return res.status(201).json({ message: "Excluindo produto" });
    } catch (error) {
        return res.status(400).json({ error: "Erro ao buscar o produto" });
    }
}

export default {
    buscaTodosProdutos,
    buscaProdutoPorId,
    salvaProduto,
    editaProduto,
    excluiProduto
}