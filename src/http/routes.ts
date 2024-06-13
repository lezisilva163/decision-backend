import { FastifyInstance } from "fastify";
import { registerController } from "./controllers/register-controller";
import { listController } from "./controllers/list-controller";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.get("/users/list", listController);
}
