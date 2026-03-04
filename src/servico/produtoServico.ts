import produtoRepositorio from "../repositorio/produtoRepositorio.js";
import categoriaRepositorio from "../repositorio/categoriaRepositorio.js";

interface dadosProduto {
    nome: string,
    descricao: string;
    preco: number;
    quantidade: number;
    imagem: string;
    id_categoria: number;
};

class produtoServico {

    async criarProduto(dados: dadosProduto) {
        this.validarDadosObrigatorios(dados);

        const categoriaExistente = await categoriaRepositorio.buscarCategroiaPorId(dados.id_categoria);
        if (!categoriaExistente) {
            throw new Error("A categoria informada para  produto não existe.");
        }

        return await produtoRepositorio.criarProduto(dados);
    }

    async buscarTodosProdutos() {
        return await produtoRepositorio.buscarTodosProdutos();
    }

    async buscarProdutoPorId(id: number) {
        if (!id) throw new Error("ID inválido para busca.");

        const produto = await produtoRepositorio.buscarProdutoPorId(id);
        if (!produto) throw new Error("Produto não encontrado.");

        return produto;
    }

    async atualizarProduto(id: number, dados: Partial<dadosProduto>) {
        await this.buscarProdutoPorId(id);

        return await produtoRepositorio.atualizarProduto(id, dados);
    }

   async excluirProduto(id: number) {
    await this.buscarProdutoPorId(id); 

    return await produtoRepositorio.excluirProduto(id);
}

    private validarDadosObrigatorios(dados: dadosProduto): void {
        if (!dados.nome || dados.nome.trim() === "") throw new Error("O nome do produto é obrigatório.");
        if (!dados.descricao || dados.descricao.trim() === "") throw new Error("A descrição é obrigatória.");
        if (dados.preco <= 0) throw new Error("O preço deve ser um valor positivo.");
        if (dados.quantidade < 0) throw new Error("A quantidade não pode ser negativa.");
        if (!dados.imagem || dados.imagem.trim() === "") throw new Error("O link da imagem é obrigatório.");
        if (!dados.id_categoria) throw new Error("O produto deve pertencer a uma categoria.");
    }
}

export default new produtoServico();