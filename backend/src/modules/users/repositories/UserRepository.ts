import { Prisma } from "@prisma/client";

import { Database } from "../../../shared/persistence/Database";

export type UserCreateInput = Prisma.UserCreateInput;

export class UserRepository {
  constructor(private database: Database) {}

  async createUser(user: UserCreateInput) {
    const dbClient = await this.database.getClient();
    return dbClient.user.create({ data: user });
  }

  async editUser(userId: number, user: Prisma.UserUpdateInput) {
    const dbClient = await this.database.getClient();
    return dbClient.user.update({ where: { id: userId }, data: user });
  }

  async getUser(email: string) {
    const dbClient = await this.database.getClient();
    return dbClient.user.findUniqueOrThrow({ where: { email } });
  }
}
