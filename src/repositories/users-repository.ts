import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  create: (data: Prisma.UserCreateInput) => Promise<User>;
  list: () => Promise<User[]>;
  getUserById: (id: string) => Promise<User | null>;
  update: (id: string, data: Prisma.UserUpdateInput) => Promise<User>;
  delete: (id: string) => Promise<void>;
}
