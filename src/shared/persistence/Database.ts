import { PrismaClient } from "@prisma/client";

export class Database {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async connect() {
    try {
      await this.prisma.$connect();
      console.log("Connection to the database is successful.");
      return true;
    } catch (err) {
      return false;
    }
  }

  public async testConnection() {
    try {
      const result = await this.prisma.$queryRaw`SELECT 1 + 1 AS sum`;
      if (Array.isArray(result) && result[0].sum === 2) return true;
      return false;
    } catch (err) {
      return false;
    }
  }

  public async getConnection() {
    return this.prisma;
  }
}
