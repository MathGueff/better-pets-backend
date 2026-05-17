import { ApiError } from '../errors/api.error'
import { AnimalMessages } from '../messages/animal.messages'
import { AnimalRepository } from '../repositories/animal.repository'
import { AnimalsService } from '../services/animal.service'
import { PaginatedQuery } from '../shared/pagination'
import { UpdateAnimalDTO } from '../validation/animal.validation'

jest.mock('../repositories/animal.repository')

describe('AnimalsService', () => {
  let service: AnimalsService
  let repository: jest.Mocked<AnimalRepository>

  beforeEach(() => {
    repository = new AnimalRepository() as jest.Mocked<AnimalRepository>
    service = new AnimalsService(repository)
    jest.clearAllMocks()
  })

  describe('list', () => {
    it('should return a list of animals', async () => {
      const mockAnimals = [{ name: 'Rex' }, { name: 'Fido' }]
      repository.list.mockResolvedValue(mockAnimals as any)

      const pagination = new PaginatedQuery({})
      const result = await service.list(pagination)

      expect(result).toEqual(mockAnimals)
      expect(repository.list).toHaveBeenCalled()
      expect(repository.list).toHaveBeenCalledWith(pagination)
    })
  })

  describe('findById', () => {
    it('should return an animal by id', async () => {
      const mockAnimal = { _id: '123', name: 'Rex' }
      repository.findById.mockResolvedValue(mockAnimal as any)

      const result = await service.findById('123')

      expect(result).toEqual(mockAnimal)
      expect(repository.findById).toHaveBeenCalledWith('123')
    })
  })

  describe('create', () => {
    it('should create a new animal if it does not exist', async () => {
      const newAnimal = { name: 'Rex', type: 'Dog' }
      repository.exists.mockResolvedValue(null)
      repository.create.mockResolvedValue({ _id: '123', ...newAnimal } as any)

      const result = await service.create(newAnimal as any)

      expect(result).toHaveProperty('_id', '123')
      expect(repository.exists).toHaveBeenCalledWith({ name: 'Rex' }, undefined)
      expect(repository.create).toHaveBeenCalledWith(newAnimal)
    })

    it('should throw ApiError if animal already exists', async () => {
      const newAnimal = { name: 'Rex', type: 'Dog' }
      repository.exists.mockResolvedValue({ _id: 'existing-id' } as any)

      const create = service.create(newAnimal as any)
      await expect(create).rejects.toThrow(ApiError)
      await expect(create).rejects.toMatchObject({
        code: 409,
        message: AnimalMessages.alreadyExistsWithName
      })
    })
  })

  describe('update', () => {
    it('should update an animal if name is not changed', async () => {
      const updateData: Partial<UpdateAnimalDTO> = { breed: 'Vira-lata' }
      repository.update.mockResolvedValue({
        _id: '123',
        breed: 'Vira-lata'
      } as any)

      const result = await service.update('123', updateData as any)

      expect(result).toHaveProperty('breed', 'Vira-lata')
      expect(repository.update).toHaveBeenCalledWith('123', updateData)
      expect(repository.exists).not.toHaveBeenCalled()
    })

    it('should update an animal if name is changed to a unique name', async () => {
      const updateData = { name: 'Fido' }
      repository.exists.mockResolvedValue(null)
      repository.update.mockResolvedValue({ _id: '123', ...updateData } as any)

      const result = await service.update('123', updateData as any)

      expect(result).toHaveProperty('name', 'Fido')
      expect(repository.exists).toHaveBeenCalledWith({ name: 'Fido' }, '123')
      expect(repository.update).toHaveBeenCalledWith('123', updateData)
    })

    it('should update an animal if name is changed to its own current name', async () => {
      const updateData = { name: 'Rex' }
      repository.exists.mockResolvedValue(null)
      repository.update.mockResolvedValue({ _id: '123', name: 'Rex' } as any)

      const result = await service.update('123', updateData as any)

      expect(result).toHaveProperty('name', 'Rex')
      expect(repository.exists).toHaveBeenCalledWith({ name: 'Rex' }, '123')
      expect(repository.update).toHaveBeenCalledWith('123', updateData)
    })

    it('should throw ApiError if name is changed to another existing animal name', async () => {
      const updateData = { name: 'Fido' }
      repository.exists.mockResolvedValue({ _id: '456', name: 'Fido' } as any)

      await expect(service.update('123', updateData as any)).rejects.toThrow(
        ApiError
      )
      await expect(
        service.update('123', updateData as any)
      ).rejects.toMatchObject({
        code: 409,
        message: AnimalMessages.alreadyExistsWithName
      })
    })
  })

  describe('delete', () => {
    it('should delete an animal', async () => {
      repository.delete.mockResolvedValue({ _id: '123' } as any)

      const result = await service.delete('123')

      expect(result).toEqual({ _id: '123' })
      expect(repository.delete).toHaveBeenCalledWith('123')
    })
  })

  describe('exists', () => {
    it('should return a document _id if animal exists', async () => {
      repository.exists.mockResolvedValue({ _id: '123' } as any)

      const result = await service.exists('Rex')

      expect(result).toHaveProperty('_id')
      expect(repository.exists).toHaveBeenCalledWith({ name: 'Rex' }, undefined)
    })

    it('should return falsy if animal does not exist', async () => {
      repository.exists.mockResolvedValue(null)

      const result = await service.exists('Rex')

      expect(result).toBeFalsy()
    })
  })
})
