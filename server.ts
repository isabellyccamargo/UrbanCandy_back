import express, { type Application } from "express";
import path from "path"; 
import { fileURLToPath } from "url"; 
import publico from "./src/routes/public.js";
import { dataBaseConectionn } from "./src/config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server: Application = express();

dataBaseConectionn();
server.use(express.json());
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
server.use(publico);
server.listen(3030, () => {
    console.log("Servidor TypeScript rodando na porta 3030");
});

export default server;