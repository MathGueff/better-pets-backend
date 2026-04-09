import { AnimalsService } from '../services/animalsService'

class MockAnimalService extends AnimalsService {
  async list() {
    return []
  }
}

describe('Animals', () => {
  it('should return all animals', async () => {
    const repo = new MockAnimalService()
    const animals = await repo.list()
    expect(animals).toBeInstanceOf(Array)
  })
})
