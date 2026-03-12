import Users from "../Models/Users.js";
import People from "../Models/People.js";

class UserRepository {
    async findAllUsers(limit: number, offset: number) {
        return await Users.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['id_user', 'ASC']],
            attributes: { exclude: ['password'] } 
        });
    }

    async findByIdUser(id_user: number) {
        return await Users.findByPk(id_user, {
            attributes: { exclude: ['password'] }
        });
    }

    async findByEmail(email: string) {
        return await Users.findOne({ where: { email } });
    }

    async findByCpf(cpf: string) {
        return await People.findOne({ where: { cpf } });
    }

    async createUser(user: Users, people: People) {
        const newUser = await user.save();
        people.id_user = newUser.id_user;
        await people.save();
        return newUser;
    }

    async updateUser(id_user: number, userData: Partial<Users>, personData: Partial<People>) {
        await Users.update(userData, { where: { id_user } });
        await People.update(personData, { where: { id_user } });
    }

    async deleteUser(id_user: number) {
        await People.destroy({ where: { id_user } });
        return await Users.destroy({ where: { id_user } });
    }
}

export default new UserRepository();