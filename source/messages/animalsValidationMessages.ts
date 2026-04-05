export const AnimalsValidationMessages = {
  name: {
    required: 'Nome é obrigatório',
    max: 'Nome deve ter no máximo 50 caracteres',
    invalid: 'Nome deve ser uma string'
  },
  breed: {
    required: 'Raça é obrigatória',
    invalid: 'Raça deve ser uma string'
  },
  gender: {
    required: 'Gênero é obrigatório',
    invalid: 'Gênero inválido'
  },
  weight: {
    required: 'Peso é obrigatório',
    positive: 'Peso deve ser um número positivo',
    invalid: 'Peso deve ser um número'
  },
  size: {
    required: 'Tamanho é obrigatório',
    positive: 'Tamanho deve ser um número positivo',
    invalid: 'Tamanho deve ser um número'
  },
  bornDate: {
    required: 'Data de nascimento é obrigatória',
    date: 'Data de nascimento deve ser uma data'
  },
  adoptionDate: {
    required: 'Data de adoção é obrigatória',
    date: 'Data de adoção deve ser uma data'
  },
  photo: {
    required: 'Foto é obrigatória',
    invalid: 'Foto deve ser um arquivo válido'
  },
  schedule: {
    required: 'Horários são obrigatórios',
    invalid: 'Horários inválidos',
    walk: 'Horário de passeio inválido',
    feed: 'Horário de alimentação inválido',
    water: 'Horário de água inválido',
    time: 'Horário deve ser uma data'
  }
}

