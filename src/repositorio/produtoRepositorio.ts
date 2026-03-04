import produtos from "../modelo/produtos.js";

class produtoRepositorio {

    async criarProduto(dados:{
        nome:string,
        descricao:string,
        preco:number,
        quantidade:number,
        imagem:string,
        id_categoria:number
    }) {
        return await produtos.create(dados);
    };

    async buscarTodosProdutos() {
        return await produtos.findAll();
    };

    async buscarProdutoPorId(id: number) {
        return await produtos.findByPk(id);
    };

    async atualizarProduto(id:number, dados: object) {
        return await produtos.update(dados, {where: {id_produto: id}});
    };

    async excluirProduto(id: number) {
        return await produtos.destroy({where: {id_produto: id}});
    };

}

export default new produtoRepositorio();