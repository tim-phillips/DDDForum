import { Prisma } from "@prisma/client";

import { Database } from "../../../shared/persistence/Database";

export type UserCreateInput = Prisma.UserCreateInput;

export class UserRepository {
  constructor(private database: Database) {}

  async createUser(user: UserCreateInput) {
    const dbConnection = await this.database.getConnection();
    return dbConnection.user.create({ data: user });
  }

  async editUser(userId: number, user: Prisma.UserUpdateInput) {
    const dbConnection = await this.database.getConnection();
    return dbConnection.user.update({ where: { id: userId }, data: user });
  }

  async getUser(email: string) {
    const dbConnection = await this.database.getConnection();
    return dbConnection.user.findUniqueOrThrow({ where: { email } });
  }
}
