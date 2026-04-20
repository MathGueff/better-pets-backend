import { Types } from 'mongoose'
import { AnimalsService } from '../services/animalsService'
import { AnimalRepository } from '../repositories/animalRepository'
import { ApiError } from '../errors/apiError'
import { AnimalMessages } from '../messages/animalsMessages'

// Mock do Repositório para não depender do banco de dados
jest.mock('../repositories/animalRepository')

describe('AnimalsService', () => {
  let service: AnimalsService
  let repository: jest.Mocked<AnimalRepository>

  beforeEach(() => {
    // Limpa os mocks antes de cada teste
    jest.clearAllMocks()
    
    // Instancia o repositório mockado
    repository = new AnimalRepository() as jest.Mocked<AnimalRepository>
    
    // Injeta o repositório mockado no serviço (Injeção de Dependência)
    service = new AnimalsService(repository)
  })

  describe('list', () => {
    it('deve retornar uma lista de animais', async () => {
      const mockAnimals = [{ name: 'Rex' }, { name: 'Thor' }]
      repository.list.mockResolvedValue(mockAnimals as any)

      const result = await service.list()

      expect(result).toEqual(mockAnimals)
      expect(repository.list).toHaveBeenCalledTimes(1)
    })
  })

  describe('findById', () => {
    it('deve retornar um animal por ID', async () => {
      const mockId = new Types.ObjectId().toString()
      const mockAnimal = { name: 'Rex', _id: mockId }
      repository.findById.mockResolvedValue(mockAnimal as any)

      const result = await service.findById(mockId)

      expect(result).toEqual(mockAnimal)
      expect(repository.findById).toHaveBeenCalledWith(new Types.ObjectId(mockId))
    })
  })

  describe('create', () => {
    it('deve criar um animal com sucesso se o nome não existir', async () => {
      const newAnimal = { name: 'Rex', age: 2, breed: 'Labrador' }
      repository.exists.mockResolvedValue(null as any) // Nome não existe
      repository.create.mockResolvedValue({ ...newAnimal, _id: '123' } as any)

      const result = await service.create(newAnimal as any)

      expect(result).toHaveProperty('_id')
      expect(repository.exists).toHaveBeenCalledWith({ name: 'Rex' })
      expect(repository.create).toHaveBeenCalledWith(newAnimal)
    })

    it('deve lançar um erro se o animal já existir com o mesmo nome', async () => {
      const newAnimal = { name: 'Rex' }
      repository.exists.mockResolvedValue({ _id: '123' } as any) // Nome já existe
      const created = service.create(newAnimal as any)

      await expect(created).rejects.toThrow(ApiError)
      await expect(created).rejects.toThrow(AnimalMessages.alreadyExistsWithName)
    })
  })

  describe('update', () => {
    it('deve atualizar um animal com sucesso', async () => {
      const mockId = new Types.ObjectId().toString()
      const updateData = { name: 'Thor' }
      repository.exists.mockResolvedValue(null as any)
      repository.update.mockResolvedValue({ ...updateData, _id: mockId } as any)

      const result = await service.update(mockId, updateData as any)

      expect(result).toEqual(expect.objectContaining(updateData))
    })
  })

  describe('delete', () => {
    it('deve remover um animal com sucesso', async () => {
      const mockId = new Types.ObjectId().toString()
      repository.delete.mockResolvedValue({ name: 'Rex' } as any)

      const result = await service.delete(mockId)

      expect(result).toBeDefined()
      expect(repository.delete).toHaveBeenCalledWith(new Types.ObjectId(mockId))
    })
  })
})
