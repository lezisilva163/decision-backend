import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterService } from "@/services/register-service";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const registerBodySchema = z.object({
      name: z.string().min(10).max(100),
      birth_date: z.string(),
      mother_name: z.string().min(10).max(100),
      password: z.string().min(10).max(30),
    });

    const parsedBody = registerBodySchema.safeParse(request.body);

    if (!parsedBody.success) {
      throw new Error("Invalid request body");
    }

    const { name, birth_date, mother_name, password } = parsedBody.data;

    const birthDateParsed = new Date(`${birth_date}T00:00:00`);
    console.log(birth_date);
    console.log(birthDateParsed);

    const usersRepository = new PrismaUsersRepository();
    const registerService = new RegisterService(usersRepository);

    await registerService.execute({
      name,
      birth_date: birthDateParsed,
      mother_name,
      password,
    });

    return reply.status(201).send();
  } catch (error) {
    console.error("Error parsing request body:", error);
    reply.status(400).send("Invalid request body");
    return;
  }
}
