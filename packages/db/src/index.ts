import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

config({ path: "../../.env" });
export const prisma = new PrismaClient();
