import usuarioRepositorio from "../repositorio/usuarioRepositorio.js";

async function buscaTodosUsuarios() {
    const usuarios = await usuarioRepositorio.buscaTodosUsuarios();

    return usuarios;
};

async function buscaUsuarioPorId(id: number) {
    const usuario = await usuarioRepositorio.buscaUsuarioPorId();

    return usuario;
};

async function salvaUsuario() {
    const salvarUsuario = await usuarioRepositorio.salvaUsuario();

    return salvarUsuario;
}

async function editaUsuario() {
    const editarUsuario = await usuarioRepositorio.editaUsuario();

    return editarUsuario;
}

async function excluiUsuario() {
    const excluirUsuario = await usuarioRepositorio.excluiUsuario();

    return excluirUsuario;
}

export default {
    buscaTodosUsuarios,
    buscaUsuarioPorId,
    salvaUsuario,
    editaUsuario,
    excluiUsuario
};

