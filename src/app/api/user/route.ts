import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const session = await auth();
  if (session instanceof NextResponse) return session;
  if (session.user && session.user.role == "ADMIN") {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } else {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }
}
