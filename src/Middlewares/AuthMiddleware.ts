import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import UserRepository from "../Repositories/UserRepository.js";
import 'dotenv/config';

type TokenPayload = {
    id: number;
    email: string;
    administrator: string;
}

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ message: "Acesso não permitido" });
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET não configurado no ambiente.");
    }

    if (!token) {
        return res.status(401).json({ message: "Token malformatado ou ausente" });
    }

    try {
        const decoded = jwt.verify(token, secret) as unknown as TokenPayload;

        const user = await UserRepository.findByIdUser(decoded.id);

        if (user) {
            (req as any).userId = decoded.id;
            return next();
        }

        return res.status(404).json({ message: 'Usuário não encontrado!' });

    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
}
export default authMiddleware;