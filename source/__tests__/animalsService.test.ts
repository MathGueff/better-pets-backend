import { AnimalsService } from '../services/animalsService'

const mockedRepository: any = {
  list: jest.fn().mockResolvedValue([]),
  findById: jest.fn().mockResolvedValue({}),
  create: jest.fn().mockResolvedValue({}),
  update: jest.fn().mockResolvedValue({}),
  delete: jest.fn().mockResolvedValue({})
}

const service = new AnimalsService(mockedRepository)

describe('AnimalsService', () => {
  it('should call repository.list and return animals', async () => {
    const mockAnimals = [{ name: 'Dog' }]

    mockedRepository.list.mockResolvedValueOnce(mockAnimals)

    const result = await service.list()

    expect(mockedRepository.list).toHaveBeenCalledTimes(1)
    expect(result).toEqual(mockAnimals)
  })

  it('should return an animal by id', async () => {
    const animal = await service.findById("objectId")
    expect(animal).toBeInstanceOf(Object)
  })

  it('should call repository.delete with correct id', async () => {
    await service.delete("")

    expect(mockedRepository.delete).toHaveBeenCalledWith("")
  })
})
