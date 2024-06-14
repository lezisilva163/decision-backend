import { UsersRepository } from "@/repositories/users-repository";
import { decryptData } from "@/utils/crypto";
import { User } from "@prisma/client";

export type ListServiceResponse = Promise<User[]>;

export class ListService {
  constructor(private usersRepository: UsersRepository) {}
  async execute(): ListServiceResponse {
    const usersList = await this.usersRepository.list();
    const decryptedUsersList = usersList.map((user) => ({
      ...user,
      mother_name: decryptData(user.mother_name),
    }));

    return decryptedUsersList;
  }
}
