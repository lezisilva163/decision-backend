import { UsersRepository } from "@/repositories/users-repository";

export type DeleteServiceResponse = Promise<void>;

export class DeleteService {
  constructor(private usersRepository: UsersRepository) {}
  async execute(id: string): DeleteServiceResponse {
    await this.usersRepository.delete(id);
  }
}
