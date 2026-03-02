import usuarioServico from "../servico/usuarioServico.js";
import { type Request, type Response } from "express";

async function buscaTodosUsuarios(req: Request, res: Response) {
    try {
        const usuarios = await usuarioServico.buscaTodosUsuarios();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(400).json({ error: "Erro ao buscar os usuários" });
    };
};

async function buscaUsuarioPorId(req: Request, res: Response) {
    try {
        return res.status(200).json({});
    } catch (error) {
        return res.status(400).json({ error: "Erro ao buscar o usuário" });
    };
};

async function salvaUsuario(req: Request, res: Response) {
    try {
        return res.status(201).json({});
    } catch (error) {
        return res.status(400).json({ error: "Erro ao salvar os usuários" });
    };
};

async function editaUsuario(req: Request, res: Response) {
    try {
        return res.status(201).json({});
    } catch (error) {
        return res.status(400).json({ error: "Erro ao editar os usuários" });
    };
};

async function excluiUsuario(req: Request, res: Response) {
    try {
        return res.status(201).json({});
    } catch (error) {
        return res.status(400).json({ error: "Erro ao excluir os usuários" });
    };
};

export default {
    buscaTodosUsuarios,
    buscaUsuarioPorId,
    salvaUsuario,
    editaUsuario,
    excluiUsuario
}