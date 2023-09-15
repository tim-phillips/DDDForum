import { PrismaClient, Prisma } from "@prisma/client";

export const prisma = new PrismaClient();

export type UserCreateInput = Prisma.UserCreateInput;

export function createUser(user: UserCreateInput) {
  return prisma.user.create({ data: user });
}

export function editUser(userId: number, user: Prisma.UserUpdateInput) {
  return prisma.user.update({ where: { id: userId }, data: user });
}

export function getUser(email: string) {
  return prisma.user.findUniqueOrThrow({ where: { email } });
}
