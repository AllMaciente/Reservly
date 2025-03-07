import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { userSchema } from "@/schemas/user/user";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (session instanceof NextResponse) return session;
  if (
    (session.user && session.user.role == "ADMIN") ||
    session.user.id == params.id
  ) {
    const user = await prisma.user.findUnique({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (session instanceof NextResponse) return session;
  if (
    (session.user && session.user.role == "ADMIN") ||
    session.user.id == params.id
  ) {
    const body = await request.json();
    const validation = userSchema.safeParse({ id: params.id, ...body });

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { id: validation.data.id },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Usuário nao encontrado" },
        { status: 404 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: validation.data.id },
      data: {
        email: validation.data.email || user.email,
        name: validation.data.username || user.name,
        role:
          session.user.role === "ADMIN"
            ? validation.data.role || user.role
            : user.role,
        password: validation.data.password
          ? await bcrypt.hash(validation.data.password, 10)
          : user.password,
      },
    });
    return NextResponse.json(updatedUser);
  } else {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (session instanceof NextResponse) return session;
  if (
    (session.user && session.user.role == "ADMIN") ||
    session.user.id == params.id
  ) {
    const user = await prisma.user.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }
}
