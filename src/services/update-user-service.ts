import { UsersRepository } from "@/repositories/users-repository";
import { encryptData } from "@/utils/crypto";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

export type UpdateServiceResponse = Promise<User>;

export class UpdateService {
  constructor(private usersRepository: UsersRepository) {}
  async execute(data: User): UpdateServiceResponse {
    if (!data || !data.id) {
      throw new Error("Invalid data for user update");
    }
    const passwordHash = await hash(data.password, 6);
    const motherNameEncrypted = encryptData(data.mother_name);

    const { id } = data;
    const updateData = {
      ...data,
      password: passwordHash,
      mother_name: motherNameEncrypted,
    };
    const updatedUser = await this.usersRepository.update(id, updateData);

    return updatedUser;
  }
}
