export enum EndpointNames {
  ANIMALS = 'animals',
  HEALTH = 'health',
  USER = 'user'
}

export const Endpoint = (endpoint: EndpointNames): string => {
  return `/${endpoint}`
}
