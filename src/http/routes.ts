import { FastifyInstance } from "fastify";
import { registerController } from "./controllers/register-controller";
import {
  getUserController,
  listController,
} from "./controllers/list-controller";
import { deleteController } from "./controllers/delete-controller";
import { updateController } from "./controllers/update-controller";

export async function appRoutes(app: FastifyInstance) {
  app.get("/users/list", listController);
  app.get("/users/:id", getUserController);
  app.post("/users", registerController);
  app.put("/users/:id", updateController);
  app.delete("/users/:id", deleteController);
}
