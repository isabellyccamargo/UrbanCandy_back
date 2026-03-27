import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import bcrypt from "bcrypt";
import UserService from "../src/Service/UserService.js";
import UserRepository from "../src/Repositories/UserRepository.js";

describe("UserService", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    describe("Criação de Usuário (Registro)", () => {
        test("deve lançar erro para e-mail com formato inválido", async () => {
            const dados: any = { email: "email-errado", cpf: "12345678901", password: "Senha123" };
            await expect(UserService.createUser(dados))
                .rejects.toThrow("INVALID_EMAIL"); // AJUSTADO
        });

        test("deve lançar erro se a senha não tiver letras e números ou for curta", async () => {
            const dados: any = { email: "teste@teste.com", cpf: "12345678901", password: "123" };
            await expect(UserService.createUser(dados))
                .rejects.toThrow("INVALID_PASSWORD"); // AJUSTADO
        });

        test("deve impedir cadastro com e-mail duplicado", async () => {
            const dados: any = { email: "duplicado@teste.com", cpf: "12345678901", password: "Senha123" };

            jest.spyOn(UserRepository, 'findByEmail').mockResolvedValue({ id_user: 1 } as any);

            await expect(UserService.createUser(dados))
                .rejects.toThrow("EMAIL_ALREADY_EXISTS"); // AJUSTADO
        });

        test("deve impedir cadastro com CPF duplicado", async () => {
            const dados: any = { email: "novo@teste.com", cpf: "12345678901", password: "Senha123" };

            jest.spyOn(UserRepository, 'findByEmail').mockResolvedValue(null);
            jest.spyOn(UserRepository, 'findByCpf').mockResolvedValue({ id_people: 1 } as any);

            await expect(UserService.createUser(dados))
                .rejects.toThrow("CPF_ALREADY_EXISTS"); // AJUSTADO
        });
    });

    describe("Autenticação (Login)", () => {
        test("deve realizar login com sucesso", async () => {
            const senhaPlana = "Senha123";
            const senhaHash = await bcrypt.hash(senhaPlana, 10);

            jest.spyOn(UserRepository, 'findByEmail').mockResolvedValue({
                id_user: 1,
                email: "user@teste.com",
                password: senhaHash,
                people: { name: "Fulano" }
            } as any);

            const result = await UserService.login("user@teste.com", senhaPlana);
            expect(result.user.nome).toBe("Fulano");
        });

        test("deve falhar login com senha incorreta", async () => {
            jest.spyOn(UserRepository, 'findByEmail').mockResolvedValue({
                password: "hash_de_outra_senha"
            } as any);

            await expect(UserService.login("user@teste.com", "senha_errada"))
                .rejects.toThrow("E-mail ou senha incorretos."); // AJUSTADO AQUI
       
            });
    });

        describe("Atualização (Update)", () => {
            test("deve impedir a alteração de e-mail", async () => {
                const dadosUpdate = { email: "novo@email.com" };
                await expect(UserService.updateUser(1, dadosUpdate, {}))
                    .rejects.toThrow("EMAIL_CHANGE_NOT_ALLOWED"); // AJUSTADO
            });

            test("deve encriptar a nova senha ao atualizar", async () => {
                const dadosUpdate = { password: "NovaSenha123" };
                const spyUpdate = jest.spyOn(UserRepository, 'updateUser').mockResolvedValue({} as any);

                await UserService.updateUser(1, dadosUpdate, {});

                const chamadaRepo = spyUpdate.mock.calls[0]![1];
                expect(chamadaRepo.password).not.toBe("NovaSenha123");
                expect(chamadaRepo.password).toHaveLength(60);
            });
        });
    });