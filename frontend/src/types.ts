export interface Animal {
  _id: string
  name: string
  age: number
  breed?: string
}

export interface AnimalFormData {
  name: string
  age: number
  breed: string
}
