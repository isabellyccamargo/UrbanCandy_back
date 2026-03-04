import { type Request, type Response } from "express";
import produtoServico from "../servico/produtoServico.js";

class produtoControlador {

    static async criarProduto(req: Request, res: Response): Promise<void> {
        try {
            const { nome, descricao, preco, quantidade, imagem, id_categoria } = req.body;
            
            const novoProduto = await produtoServico.criarProduto({
                nome,
                descricao,
                preco,
                quantidade,
                imagem,
                id_categoria
            });

            res.status(201).send(novoProduto);
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Erro ao salvar produto";
            res.status(400).send({ mensagem });
        }
    }

    static async buscarTodosProdutos(req: Request, res: Response): Promise<void> {
        try {
            const produtos = await produtoServico.buscarTodosProdutos();
            res.status(200).send(produtos);
        } catch (error: unknown) {
            res.status(500).send({ mensagem: "Erro interno ao buscar produtos" });
        }
    }

    static async buscarProdutoPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params; 
            const produto = await produtoServico.buscarProdutoPorId(Number(id));
            res.status(200).send(produto);
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Produto não encontrado";
            res.status(404).send({ mensagem });
        }
    }

    static async atualizarProduto(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const dados = req.body;
            
            await produtoServico.atualizarProduto(Number(id), dados);
            res.status(200).send({ mensagem: "Produto atualizado com sucesso!" });
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Erro ao editar produto";
            res.status(400).send({ mensagem });
        }
    }

    static async excluirProduto(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await produtoServico.excluirProduto(Number(id));
            
            res.status(204).send();
        } catch (error: unknown) {
            const mensagem = error instanceof Error ? error.message : "Erro ao excluir produto";
            res.status(400).send({ mensagem });
        }
    }
}

export default produtoControlador;