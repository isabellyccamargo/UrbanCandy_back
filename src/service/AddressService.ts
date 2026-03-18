import type Address from "../Models/Address.js";
import AddressRepository from "../Repositories/AddressRepository.js";

class AddressService {
    async create(data: Address) {
        if (!data.cep || data.cep.length !== 8) {
            throw new Error("O CEP é obrigatório e deve ter 8 dígitos.");
        }
        if (!data.road || !data.city || !data.number) {
            throw new Error("Rua, Cidade e Número são campos obrigatórios.");
        }
        return await AddressRepository.create(data);
    }

    async findAll(page: number = 1, size: number = 10) {
        const limit = size;
        const offset = (page - 1) * size;
        const result = await AddressRepository.findAll(limit, offset);
        
        return {
            totalItems: result.count,
            totalPages: Math.ceil(result.count / size),
            currentPage: page,
            data: result.rows
        };
    }

    async findById(id_address: number) {
        const address = await AddressRepository.findById(id_address);
        if (!address) throw new Error("Endereço não encontrado.");
        return address;
    }

    async update(id_address: number, data: Partial<Address>) {
        await this.findById(id_address);
        return await AddressRepository.update(id_address, data);
    }

    async delete(id_address: number) {
        await this.findById(id_address);
        return await AddressRepository.delete(id_address);
    }
}

export default new AddressService();