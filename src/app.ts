import fastify from "fastify";
import { appRoutes } from "@/http/routes";
import cors from "@fastify/cors";

export const app = fastify();

app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});
app.register(appRoutes);
