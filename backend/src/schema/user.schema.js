const { z } = require("zod");

const userSchema = z.object({
  id: z.preprocess(
    (val) => Number(val),
    z.number().int().positive("ID inválido")
  ),
  name: z.string().min(3).max(255).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).max(255).optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
});

const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "Nome muito curto, mínimo de 3 caracteres")
    .max(255, "Nome muito longo, máximo de 255 caracteres"),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "Senha muito curta, mínimo de 8 caracteres")
    .max(255, "Senha muito longa, máximo de 255 caracteres"),
});

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "Senha muito curta, mínimo de 8 caracteres")
    .max(255, "Senha muito longa, máximo de 255 caracteres"),
});

module.exports = {
  userSchema,
  createUserSchema,
  loginSchema,
};
