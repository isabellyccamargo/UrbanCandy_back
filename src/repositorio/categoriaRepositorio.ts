import categoria from "../modelo/categorias.js";

class categoriaRepositorio {

    async criarCategoria(nome: string) {
        return await categoria.create({ nome_categoria: nome });
    };

    async buscarTodasCategorias() {
        return await categoria.findAll();
    };

    async buscarCategroiaPorId(id: number) {
        return await categoria.findByPk(id);
    };

    async atualizarCategoria(id: number, nome: string) {
        return await categoria.update(
            { nome_categoria: nome }, 
            { where: { id_categoria: id } } 
        );
    }
    
    async excluirCategoria(id: number) {

        return await categoria.destroy({
            where: { id_categoria: id }
        });
    }

}

export default new categoriaRepositorio();