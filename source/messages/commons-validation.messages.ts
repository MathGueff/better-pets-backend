export const commonValidationMessages = {
  invalid: {
    objectId: 'ID informado é inválido',
    limit: {
      type: 'Limite deve ser um número',
      min: 'Limite deve ser maior do que 0',
      max: 'Limite deve ser menor do que 50'
    },
    page: {
      type: 'Pagina deve ser um número',
      min: 'Página deve ser maior do que 0'
    }
  }
} as const
