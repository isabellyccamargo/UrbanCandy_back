import UserRepository from "../Repositories/UserRepository.js";
import Users from "../Models/Users.js";
import People from "../Models/People.js";
import bcrypt from "bcrypt";
import Address from "../Models/Address.js";

interface UserWithProfile extends Users {
    people?: {
        name: string;
    };
}

interface IUserRegistration {
    email: string;
    password?: string;
    name: string;
    cpf: string;
    telephone: string;
    cep: string;
    city: string;
    neighborhood: string;
    road: string;
    number: number;
    complement: string;
    administrator?: string;
}

class UserService {
    // FUNÇÃO AUXILIARES
    private validateEmail(email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) throw new Error("Formato de e-mail inválido! ");
    }

    private validateCPF(cpf: string) {
        if (!cpf || cpf.length !== 11) throw new Error("CPF deve conter 11 dígitos! ");
    }

    private validatePasswordLevel(password: string) {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!regex.test(password)) {
            throw new Error("A senha deve ter no mínimo 8 caracteres, incluindo letras e números.");
        }
    }

    async login(email: string, password: string) {
        const user = await UserRepository.findByEmail(email) as UserWithProfile;

        if (!user) throw new Error("E-mail ou senha incorretos.");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error("E-mail ou senha incorretos.");

        return {
            id_user: user.id_user,
            email: user.email,
            administrator: user.administrator,
            nome: user.people?.name || "Usuário"
        };
    }

    // CRUD PRINCIPAL
    async findAllUsers(page: number = 1, size: number = 10) {
        const limit = size;
        const offset = (page - 1) * size;
        return await UserRepository.findAllUsers(limit, offset);
    }

    async createUser(allData: IUserRegistration): Promise<Users> {
        this.validateEmail(allData.email);
        this.validateCPF(allData.cpf);
        if (!allData.password) throw new Error("A senha é obrigatória.");
        this.validatePasswordLevel(allData.password);

        const userExists = await UserRepository.findByEmail(allData.email);
        if (userExists) {
            throw new Error("Este endereço de e-mail já está cadastrado em nossa plataforma.");
        }

        const cpfExists = await UserRepository.findByCpf(allData.cpf);
        if (cpfExists) {
            throw new Error("O CPF informado já pertence a uma conta ativa.");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(allData.password, salt);

        const userData: Partial<Users> = {
            email: allData.email,
            password: hashedPassword,
            administrator: allData.administrator || '0'
        };

        const addressData: Partial<Address> = {
            cep: allData.cep,
            city: allData.city,
            neighborhood: allData.neighborhood,
            road: allData.road,
            complement: allData.complement || "",
            number: BigInt(allData.number)
        };

        const personData: Partial<People> = {
            name: allData.name,
            cpf: allData.cpf,
            telephone: allData.telephone
        };

        return await UserRepository.createUser(userData, personData, addressData);
    }

    async updateUser(id_user: number, userData: Partial<Users>, personData: Partial<People>) {
        if (userData.email) throw new Error("A alteração de e-mail não é permitida.");

        if (userData.password) {
            this.validatePasswordLevel(userData.password);
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(userData.password, salt);
        }

        return await UserRepository.updateUser(id_user, userData, personData);
    }

    async findByIdUser(id_user: number) {
        // Agora o Repositório já traz tudo (User + People + Address)
        const user = await UserRepository.findByIdUser(id_user);
        if (!user) throw new Error("Usuário não encontrado.");
        return user;
    }
}

export default new UserService();   