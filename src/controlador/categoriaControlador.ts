import { type Request, type Response } from "express";
import categoriaServico from "../servico/categoriaServico.js";

class categoriaControlador {

    static async criarCategoria(req: Request, res: Response) {
        try {
            const { nome_categoria } = req.body;
            const servico = categoriaServico;
            const novaCategoria = await servico.criarCategoria(nome_categoria);

            res.status(201).send(novaCategoria);
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Erro ao criar categoria";
            res.status(400).send({ mensagem });
        }
    }

    static async buscarTodasCategorias(req: Request, res: Response) {
        try {
            const servico = categoriaServico;
            const categorias = await servico.buscarTodasCategorias();
            res.send(categorias);
        } catch (error: unknown) {
            res.status(500).send({ mensagem: "Erro ao buscar categorias." });
        }
    }

    static async buscarCategroiaPorId(req: Request, res: Response) {
        try {
            const { id } = req.params; 
            const servico = categoriaServico;
            const categoria = await servico.buscarCategroiaPorId(Number(id));
            res.send(categoria);
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Categoria não encontrada";
            res.status(404).send({ mensagem });
        }
    }

    static async atualizarCategoria(req: Request, res: Response) {
        try {
            const { id_categoria } = req.params; 
            const { nome_categoria } = req.body;
            const servico = categoriaServico;

            await servico.atualizarCategoria(Number(id_categoria), nome_categoria);
            
            res.send({ mensagem: "Categoria atualizada com sucesso!" });
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Erro ao atualizar categoria";
            res.status(400).send({ mensagem });
        }
    }

    static async excluirCategoria(req: Request, res: Response) {
        try {
            const { id_categoria} = req.params;
            const servico = categoriaServico;

            await servico.excluirCategoria(Number(id_categoria));
            res.status(204).send(); 
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Erro ao excluir categoria";
            res.status(400).send({ mensagem });
        }
    }

}

export default categoriaControlador;