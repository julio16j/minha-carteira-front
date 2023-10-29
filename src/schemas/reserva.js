import { z } from "zod"

export const reservaShcema = z.object({
  nome: z.string().min(3, { message: "Nome é obrigatório" }),
  valor: z.coerce.number({invalid_type_error: "Valor inserido é inválido"}),
  rentabilidade: z.coerce.number({invalid_type_error: "Rentabilidade inserida é inválida"}).optional(),
  liquidez: z.string().min(1, { message: "Liquidez é obrigatório" }).optional()
})