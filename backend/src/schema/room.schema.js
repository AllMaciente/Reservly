const { z } = require("zod");

const roomSchema = z.object({
  id: z.preprocess(
    (val) => Number(val),
    z.number().int().positive("ID inválido")
  ),
  name: z.string().optional(),
  location: z.string().optional(),
  capacity: z.number().int().positive().optional(),
  features: z
    .array(
      z.object({
        feature: z.string(),
        quantity: z.number().int().positive(),
      })
    )
    .optional(),
  available: z.boolean().optional(),
});

const createRoomSchema = z.object({
  name: z.string().min(3).max(255),
  location: z.string().min(3).max(255),
  capacity: z.number().int().positive(),
  features: z
    .array(
      z.object({
        feature: z.string(),
        quantity: z.number().int().positive(),
      })
    )
    .optional(),
  available: z.boolean().optional(),
});

module.exports = { roomSchema, createRoomSchema };
