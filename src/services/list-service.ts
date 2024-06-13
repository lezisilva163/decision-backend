import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";

export type ListServiceResponse = Promise<User[]>;

export class ListService {
  constructor(private usersRepository: UsersRepository) {}
  async execute(): ListServiceResponse {
    return this.usersRepository.list();
  }
}
