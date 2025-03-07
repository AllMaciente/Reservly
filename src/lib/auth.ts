import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Função de autenticação reutilizável
import { Session } from "next-auth";

export async function auth() {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  // Adiciona a propriedade role ao objeto user na sessão
  if (session.user) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email ?? undefined },
    });
    session.user.role = user?.role || null;
  }

  return session;
}
