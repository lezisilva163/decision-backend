import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { ListService } from "@/services/list-service";

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
