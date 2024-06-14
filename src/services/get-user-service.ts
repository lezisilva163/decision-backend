import { UsersRepository } from "@/repositories/users-repository";
import { decryptData } from "@/utils/crypto";
import { User } from "@prisma/client";

export type getUserServiceResponse = Promise<User | null>;

export class GetUserService {
  constructor(private usersRepository: UsersRepository) {}
  async execute(id: string): getUserServiceResponse {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    const decryptedMotherName = decryptData(user.mother_name);

    // Retorna o usuário com o mother_name descriptografado
    return {
      ...user,
      mother_name: decryptedMotherName,
    };
  }
}
