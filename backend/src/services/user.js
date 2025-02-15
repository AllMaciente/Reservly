import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT = 12;

class UserService {
  async CreateUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, SALT);
    return await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
  async GetUserById(id) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  async GetUsers() {
    return await prisma.user.findMany();
  }
  async UpdateUser(id, name, email, password, role) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const hashedPassword = await bcrypt.hash(password, SALT);

    name = name || user.name;
    email = email || user.email;
    role = role || user.role;
    if (password) {
      password = hashedPassword;
    } else {
      password = user.password;
    }

    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
        role: Role[role],
      },
    });
  }
  async DeleteUser(id) {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async LoginUser(email, password) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, "ksszn");
    return { token };
  }
}

module.exports = new UserService();
