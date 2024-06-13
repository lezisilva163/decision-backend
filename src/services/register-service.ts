import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";

interface RegisterServiceRequest {
  name: string;
  birth_date: Date;
  mother_name: string;
  password: string;
}

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    name,
    birth_date,
    mother_name,
    password,
  }: RegisterServiceRequest) {
    const passwordHash = await hash(password, 6);

    await this.usersRepository.create({
      name,
      birth_date,
      mother_name,
      password: passwordHash,
    });
  }
}
