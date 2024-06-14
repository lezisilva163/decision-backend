import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { DeleteService } from "@/services/delete-service";
import { z } from "zod";

export async function deleteController(
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
    const deleteService = new DeleteService(usersRepository);

    const response = await deleteService.execute(id);

    return reply.status(200).send(response);
  } catch (error) {
    console.error(error);
    return reply.status(500).send(error);
  }
}
