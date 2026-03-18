import Address from "../Models/Address.js";

class AddressRepository {
    async create(address: Address): Promise<Address> {
        return await Address.create(); 
    }

    async findAll(limit: number, offset: number): Promise<{ rows: Address[]; count: number }> {
        return await Address.findAndCountAll({ limit, offset });
    }

    async findById(id_address: number): Promise<Address | null> {
        return await Address.findByPk(id_address);
    }

    async update(id_address: number, data: Partial<Address>): Promise<[number]> {
        return await Address.update(data, { where: { id_address } });
    }

    async delete(id_address: number): Promise<number> {
        return await Address.destroy({ where: { id_address } });
    }
}

export default new AddressRepository();