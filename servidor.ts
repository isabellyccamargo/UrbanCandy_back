import express, {type Application, type Request, type Response } from "express";
import publico from "./src/rotas/publico.js" ;
import { conectarBanco } from "./src/configuracoes/config.js";

const servidor: Application = express();

conectarBanco();

servidor.use(express.json());
servidor.use(publico);

servidor.listen(3030, () => {
    console.log("Servidor TypeScript rodando na porta 3030");
});

export default servidor;