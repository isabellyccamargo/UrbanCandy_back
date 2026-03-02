import express, {type Application, type Request, type Response } from "express";
import publico from "./src/rotas/publico.js" ;

const servidor: Application = express();

servidor.use(express.json());
servidor.use(publico);

servidor.listen(3000, () => {
    console.log("Servidor TypeScript rodando na porta 3000");
});

export default servidor;