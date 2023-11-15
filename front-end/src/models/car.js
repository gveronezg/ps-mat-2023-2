import { z } from 'zod'

const Car = z.object({
    brand:
        z.string()
        .min(1, { message: 'A marca deve ter, no mínimo, 1 caracter' })
        .max(25, { message: 'A marca deve ter, no máximo, 25 caracteres' }),
  
    model:
        z.string()
        .min(1, { message: 'O modelo deve ter, no mínimo, 1 caracter' })
        .max(25, { message: 'O modelo deve ter, no máximo, 25 caracteres' }),

    color:
        z.string()
        .min(4, { message: 'A cor deve ter, no mínimo, 4 caracteres' })
        .max(20, { message: 'A cor deve ter, no máximo, 20 caracteres' }),

    year_manufacture:
        z.number()
        .int()
        .min(1940, { message: 'O ano de fabricação deve ser no mínimo 1940' })
        .max(2023, { message: 'O ano de fabricação deve ser no máximo 2023' }),

    imported:
        z.boolean(),

    plates:
        z.string()
        .trim()
        .length(8, { message: 'As placas devem ter exatamente 8 caracteres' }),

    selling_date:
        z.coerce.date()
        .max(new Date(), { message: 'A data de venda não pode ser posterior à data atual' })
        .nullable(),

    selling_price:
        z.number()
        .min(2000, { message: 'O preço de venda deve ser no mínimo 2000' })
        .max(9999999999999999999999999999999999, { message: 'Este valor ultrapassa o limite aceitavel para o registro no banco de dados.' })
        .nullable(),

    customer_id:
        z.number()
        .int()
        .min(1, { message: 'O ID do cliente deve ser um número inteiro positivo' })
        .nullable(),
})

export default Car