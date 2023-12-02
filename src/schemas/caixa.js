import { z } from "zod"

export const caixaSchema = z.object({
  nome: z.coerce.string().min(3, { message: "Nome é obrigatório" }),
  valor: z.coerce.number({invalid_type_error: "Valor inserido é inválido"}).gt(0, 'Valor é obrigatório e dever ser maior que 0'),
  rentabilidade: z.string().optional(),
  liquidez: z.string().optional()
})