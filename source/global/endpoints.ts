export enum EndpointNames {
  ANIMALS = 'animals',
  HEALTH = 'health'
}

export const Endpoint = (endpoint: EndpointNames) => {
  return `/${endpoint}`
}
