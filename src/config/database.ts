import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export let prisma: PrismaClient;
export function connectDb(): void {
  prisma = new PrismaClient();
}

export const redis = createClient({
  url: process.env.REDIS_URL,
});

export async function connectRedis(): Promise<void> {
  await redis.connect();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}

export async function disconnectRedis(): Promise<void> {
  await redis?.disconnect();
}
