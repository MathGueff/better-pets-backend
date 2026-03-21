import { Types } from 'mongoose'
import { IAnimal } from '../models/animalModel'
import { AnimalRepository } from '../repositories/animalRepository'

export class AnimalsService {
  private animalRepository: AnimalRepository = new AnimalRepository()

  list() {
    const listed = this.animalRepository.list()
    return listed
  }

  findById(id: string) {
    const found = this.animalRepository.findById(new Types.ObjectId(String(id)))
    return found
  }

  async create(newAnimal: IAnimal) {
    const exists = await this.animalRepository.exists({ name: newAnimal.name })
    if (exists) {
      throw new Error('Animal já cadastrado')
    }

    const created = await this.animalRepository.create(newAnimal)

    return created
  }

  update(id: string, updateAnimal: Partial<IAnimal>) {
    const updated = this.animalRepository.update(
      new Types.ObjectId(String(id)),
      updateAnimal
    )
    return updated
  }

  delete(id: string) {
    const deleted = this.animalRepository.delete(new Types.ObjectId(String(id)))
    return deleted
  }
}
