export enum EndpointNames {
  ANIMALS = 'animals',
  HEALTH = 'health',
  USER = 'users'
}

export const Endpoint = (endpoint: EndpointNames): string => {
  return `/${endpoint}`
}
