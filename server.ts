import express, { type Application, type Request, type Response } from "express";
import publico from "./src/routes/public.js";
import { dataBaseConectionn } from "./src/config/config.js";

const server: Application = express();

dataBaseConectionn();

server.use(express.json());
server.use(publico);

server.listen(3030, () => {
    console.log("Servidor TypeScript rodando na porta 3030");
});

export default server;