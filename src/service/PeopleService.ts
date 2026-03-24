import PeopleRepository from "../Repositories/PeopleRepository.js";
import People from "../Models/People.js";

class PeopleService {
    // Validações Auxiliares
    private validateCPF(cpf: string) {
        if (!cpf || cpf.length !== 11) {
            throw new Error("O CPF é obrigatório e deve ter 11 dígitos.");
        }
    }

    // Métodos CRUDS
    async findAllPeople(page: number = 1, size: number = 10) {
        const limit = size;
        const offset = (page - 1) * size;
        return await PeopleRepository.findAllPeople(limit, offset);
    }

    async findByIdPeople(idPeople: number) {
        const person = await PeopleRepository.findByIdPeople(idPeople);
        if (!person) throw new Error("Pessoa não encontrada.");
        return person;
    }

    async updatePeople(idPeople: number, people: People) {
        if (!idPeople) throw new Error("ID é necessário.");

        const personExists = await this.findByIdPeople(idPeople);

        if (people.cpf && people.cpf !== personExists.cpf) {
            throw new Error("A alteração de CPF não é permitida.");
        }

        return await PeopleRepository.updatePeople(idPeople, people);
    }

    async deletePeople(id_people: number) {
        await this.findByIdPeople(id_people);
        return await PeopleRepository.deletePeople(id_people);
    }
}

export default new PeopleService();