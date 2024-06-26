import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { ListService } from "@/services/list-service";
import { GetUserService } from "@/services/get-user-service";
import { z } from "zod";

export async function listController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const usersRepository = new PrismaUsersRepository();
    const listService = new ListService(usersRepository);

    const response = await listService.execute();

    return reply.status(200).send(response);
  } catch (error) {
    console.error(error);
    return reply.status(500).send(error);
  }
}

export async function getUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const deleteParamsSchema = z.object({
      id: z.string(),
    });
    const parsedParams = deleteParamsSchema.safeParse(request.params);

    if (!parsedParams.success) {
      throw new Error("Invalid request params");
    }

    const { id } = parsedParams.data;

    const usersRepository = new PrismaUsersRepository();
    const getUserService = new GetUserService(usersRepository);

    const response = await getUserService.execute(id);

    return reply.status(200).send(response);
  } catch (error) {
    console.error(error);
    return reply.status(500).send(error);
  }
}
