import { z } from "zod";

export const userSchema = z.object({
  id: z.preprocess((id) => Number(id), z.number()),
  username: z
    .string()
    .min(3, "Nome deve conter no mínimo 3 caracteres")
    .max(20, "Nome deve conter no máximo 20 caracteres")
    .optional(),
  email: z.string().email("Email inválido").optional(),
  password: z
    .string()
    .min(6, "Senha deve conter no mínimo 6 caracteres")
    .max(20, "Senha deve conter no máximo 20 caracteres")
    .optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
});
