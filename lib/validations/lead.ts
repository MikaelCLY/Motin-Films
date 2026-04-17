import { z } from 'zod'

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter no mínimo 2 caracteres')
    .max(255, 'Nome muito longo')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),
  email: z
    .string()
    .email('Email inválido')
    .max(255, 'Email muito longo'),
  phone: z
    .string()
    .min(10, 'Telefone inválido')
    .max(20, 'Telefone muito longo')
    .regex(/^\+?[\d\s\-().]+$/, 'Telefone inválido'),
  necessity: z.enum(
    ['filme_institucional', 'filme_produto', 'filme_evento', 'filme_conteudo', 'outros'],
    { message: 'Selecione uma necessidade' }
  ),
})

export type LeadSchemaType = z.infer<typeof leadSchema>
