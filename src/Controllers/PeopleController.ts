import { type Request, type Response } from "express";
import PeopleService from "../Service/PeopleService.js";
import People from "../Models/People.js";

class PeopleController {

    static async findAllPeople(req: Request, res: Response) {
        try {
            const { page, size } = req.query;
            const pageNumber = Number(page) || 1;
            const sizeNumber = Number(size) || 10;

            const result = await PeopleService.findAllPeople(pageNumber, sizeNumber);

            res.send({
                totalItems: result.count,
                totalPages: Math.ceil(result.count / sizeNumber),
                currentPage: pageNumber,
                data: result.rows
            });
        } catch (error: any) {
            res.status(500).send({ mensagem: "Erro ao buscar pessoas." });
        }
    }

    static async findByIdPeople(req: Request, res: Response) {
        try {
            const { id_people } = req.params;
            const person = await PeopleService.findByIdPeople(Number(id_people));
            res.send(person);
        } catch (error: any) {
            res.status(404).send({ mensagem: error.message });
        }
    }

    static async updatePeople(req: Request, res: Response) {
        try {
            const { id_people } = req.params;
            const peopleInstance = People.build(req.body);

            await PeopleService.updatePeople(Number(id_people), peopleInstance);
            res.send({ mensagem: "Dados pessoais atualizados com sucesso!" });
        } catch (error: any) {
            res.status(400).send({ mensagem: error.message });
        }
    }
}

export default PeopleController;