import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Nome deve conter no mínimo 3 caracteres")
    .max(20, "Nome deve conter no máximo 20 caracteres"),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(6, "Senha deve conter no mínimo 6 caracteres")
    .max(20, "Senha deve conter no máximo 20 caracteres"),
});
