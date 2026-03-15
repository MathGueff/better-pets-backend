import { IEntity } from '../interfaces/entity'

export abstract class BaseController<T extends IEntity> {
	public data: T[] = []
}