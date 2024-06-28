import { z } from "zod"

export const acaoDockSchema = z.object({
  id: z.coerce.number({invalid_type_error: "O id deve ser um número"}),
  ticker: z.coerce.string().min(3, { message: "Ticker é obrigatório" }),
  quantidade: z.coerce.number({invalid_type_error: "Quantidade inserida é inválido"}).gt(0, 'Quantidade é obrigatória e dever ser maior que 0'),
  preco: z.coerce.number({invalid_type_error: "Preço inserido é inválido"}).gt(0, 'Preço é obrigatório e dever ser maior que 0'),
})