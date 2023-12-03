import { z } from "zod"

export const acaoSchema = z.object({
  ticker: z.coerce.string().min(3, { message: "Ticker é obrigatório" }),
  setor: z.coerce.string().min(3, { message: "Setor é obrigatório" }),
  quantidade: z.coerce.number({invalid_type_error: "Quantidade inserida é inválido"}).gt(0, 'Quantidade é obrigatória e dever ser maior que 0'),
  nota: z.coerce.number({invalid_type_error: "Nota inserida é inválido"}).gt(0, 'Nota é obrigatória e dever ser maior que 0'),
  precoMedio: z.coerce.number({invalid_type_error: "Preço médio inserido é inválido"}).gt(0, 'Preço médio é obrigatório e dever ser maior que 0'),
  yield: z.coerce.number({invalid_type_error: "Dividend Yield inserido é inválido"}).gt(0, 'Dividend Yield é obrigatório e dever ser maior que 0')
})