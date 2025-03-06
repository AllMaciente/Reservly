import { registerSchema } from "@/schemas/user/register";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: { email: validation.data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Usuário já existe com esse e-mail" },
        { status: 400 }
      );
    }

    const adminUser = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    const hashedPassword = await bcrypt.hash(validation.data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: validation.data.username,
        email: validation.data.email,
        password: hashedPassword,
        role: adminUser ? "USER" : "ADMIN",
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
