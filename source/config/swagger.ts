import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
  RouteConfig
} from '@asteasolutions/zod-to-openapi'
import { animalDocs } from '../docs/animalDocs'

export const registry = new OpenAPIRegistry()
const registerDocs = (docs: Array<RouteConfig>) => {
  docs.forEach((doc) => registry.registerPath(doc))
}

registerDocs(animalDocs)

export const generateSwaggerDocs = () => {
  const generator = new OpenApiGeneratorV3(registry.definitions)
  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Better Pets API',
      description: 'API para gerenciamento de pets'
    },
    servers: [{ url: `http://localhost:${process.env.PORT}` }]
  })
}
