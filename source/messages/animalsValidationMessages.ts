export const AnimalsValidaitionMessages = {
  name: {
    required: 'Nome é obrigatório',
    max: 'Nome deve ter no máximo 50 caracteres'
  },
  breed: { required: 'Raça é obrigatória' },
  gender: { required: 'Gênero é obrigatório' },
  weight: {
    required: 'Peso é obrigatório',
    positive: 'Peso deve ser um número positivo'
  },
  size: {
    required: 'Tamanho é obrigatório',
    positive: 'Tamanho deve ser um número positivo'
  },
  bornDate: {
    required: 'Data de nascimento é obrigatória',
    date: 'Data de nascimento deve ser uma data'
  },
  adoptionDate: {
    required: 'Data de adoção é obrigatória',
    date: 'Data de adoção deve ser uma data'
  },
  photo: { required: 'Foto é obrigatória' },
  schedule: { required: 'Horários são obrigatórios' }
}
