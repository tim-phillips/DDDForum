import { PrismaClient, Prisma } from "@prisma/client";

export class Database {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async connect() {
    try {
      await this.prisma.$connect();
      console.log("Connection to the database successful.");
      return true;
    } catch (err) {
      return false;
    }
  }

  public async testConnection() {
    try {
      const result: any = await this.prisma.$queryRaw`SELECT 1 + 1 AS sum`;
      if (result[0].sum === 2) return true;
      return false;
    } catch (err) {
      return false;
    }
  }

  public async getConnection() {
    return this.prisma;
  }
}
