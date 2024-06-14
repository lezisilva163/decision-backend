import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { z } from "zod";
import { UpdateService } from "@/services/update-user-service";

export async function updateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const updateParamsSchema = z.object({
      id: z.string(),
      name: z.string().min(10).max(100),
      birth_date: z.string(),
      mother_name: z.string().min(10).max(100),
      password: z.string().min(10).max(30),
    });
    const parsedParams = updateParamsSchema.safeParse(request.body);

    if (!parsedParams.success) {
      throw new Error("Invalid request params");
    }

    const {
      id,
      name,
      birth_date: birthDate,
      mother_name,
      password,
    } = parsedParams.data;

    const usersRepository = new PrismaUsersRepository();
    const updateService = new UpdateService(usersRepository);

    const response = await updateService.execute({
      id,
      name,
      birth_date: new Date(birthDate),
      mother_name,
      password,
    });

    return reply.status(200).send(response);
  } catch (error) {
    console.error(error);
    return reply.status(500).send(error);
  }
}
