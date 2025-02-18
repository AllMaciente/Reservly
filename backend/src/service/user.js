const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT = 12;

class UserService {
  async CreateUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, SALT);
    return await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      },
    });
  }
  async GetUserById(userData) {
    return await prisma.user.findUnique({
      where: {
        id: Number(userData.id),
      },
    });
  }
  async GetUsers() {
    return await prisma.user.findMany();
  }
  async UpdateUser(userData) {
    const user = await prisma.user.findUnique({
      where: {
        id: userData.id,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const name = userData.name || user.name;
    const email = userData.email || user.email;
    const role = userData.role || user.role;
    const password = userData.password
      ? await bcrypt.hash(userData.password, SALT)
      : user.password;

    return await prisma.user.update({
      where: {
        id: userData.id,
      },
      data: {
        name,
        email,
        password,
        role: Role[role],
      },
    });
  }
  async DeleteUser(userData) {
    return await prisma.user.delete({
      where: {
        id: userData.id,
      },
    });
  }

  async LoginUser(userData) {
    const user = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(userData.password, user.password);
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
