import { z } from 'zod'
import { cpf } from 'cpf-cnpj-validator'

// O cliente deve ser maior de 18 anos
// Por isso, para validar, calculamos a data máxima em que
// o cliente pode ter nascido para ter 18 anos na data de hoje
const maxBirthDate = new Date()   // Hoje
maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 18)  // Data há 18 anos atrás

// O cliente pode ter nascido, no máximo, há 120 anos
const minBirthDate = new Date()
minBirthDate.setFullYear(maxBirthDate.getFullYear() - 120)

const Customer = z.object({
  name: 
    z.string()
    .min(5, { message: 'O nome deve ter, no mínimo, 5 caracteres' })
    .includes(' ', { message: 'O nome deve ter um espaço separando nome e sobrenome' }),
  
  ident_document: 
    z.string()
    .trim()
    .length(14, { message: 'O CPF está incompleto'})
    .refine(val => cpf.isValid(val), { message: 'CPF inválido' }),
  
  birth_date: 
    // coerce força a conversão para o tipo Date, se o dado recebido for string
    z.coerce.date()
    .min(minBirthDate, { message: 'Data de nascimento está muito no passado'})
    .max(maxBirthDate, { message: 'O cliente deve ser maior de 18 anos' })
    .nullable(),
  
  street_name: 
    z.string()
    .max(40, { message: 'O nome da rua pode conter, no máximo, 40 caracteres' }),
  
  house_number: 
    z.string()
    .max(10, { message: 'O número pode conter, no máximo, 10 caracteres' }),
  
  complements: 
    z.string()
    .max(20, { message: 'O complemento pode conter, no máximo, 20 caracteres' })
    .nullable(),
  
  neighborhood: 
    z.string()
    .max(30, { message: 'O bairro pode conter, no máximo, 30 caracteres' }),
  
  municipality: 
    z.string()
    .max(40, { message: 'O município pode conter, no máximo, 40 caracteres' }),
  
  state: 
    z.string()
    .length(2, { message: 'UF deve ter, exatamente, 2 caracteres' }),
  
  phone: 
    z.string()
    .transform(v => v.replace('_', '')) // Retira os sublinhados
    // Depois de um transform(), não podemos usar length(). Por isso, temos que
    // usar refine() passando uma função personalizada para validar o tamanho do campo
    .refine(v => v.length == 15, { message: 'O número do telefone/celular está incompleto' }),
  
  email: 
    z.string()
    .email({ message: 'E-mail inválido' })
})

export default Customer