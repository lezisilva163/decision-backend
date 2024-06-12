import { FastifyReply, FastifyRequest } from "fastify";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string().min(10).max(100),
    birth_date: z.preprocess(
      (arg) => {
        if (typeof arg === "string" || arg instanceof Date) {
          return new Date(arg);
        }
      },
      z.date().refine(
        (date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return date <= today;
        },
        {
          message: "birth_date must not be in the future",
        }
      )
    ),
    mother_name: z.string().min(10).max(100),
    password: z.string().min(10).max(30),
  });

  const { name, birth_date, mother_name, password } = registerBodySchema.parse(
    request.body
  );

  const passwordHash = await hash(password, 6);

  await prisma.user.create({
    data: {
      name,
      birth_date,
      mother_name,
      password: passwordHash,
    },
  });

  return reply.status(201).send();
}
