import { RouteConfig } from '@asteasolutions/zod-to-openapi'
import { z } from '../config/zod'
import { Endpoint, EndpointNames } from '../global/endpoints'
import { AnimalsValidationMessages } from '../messages/animal-validation.messages'
import { AnimalMessages } from '../messages/animal.messages'
import { AnimalValidations } from '../validation/animal.validation'
import { ResponseSchema } from '../validation/response.validation'

const messages = AnimalMessages

export const animalDocs: Array<RouteConfig> = [
  {
    method: 'get',
    path: Endpoint(EndpointNames.ANIMALS),
    tags: ['Animals'],
    summary: 'Lista todos os amiguinhos',
    responses: {
      200: {
        description: messages.found,
        content: {
          'application/json': {
            schema: ResponseSchema.success(z.array(AnimalValidations.create))
          }
        }
      },
      404: {
        description: messages.notFound,
        content: {
          'application/json': {
            schema: ResponseSchema.error(messages.notFound, 404)
          }
        }
      }
    }
  },
  {
    method: 'get',
    path: `${Endpoint(EndpointNames.ANIMALS)}/{id}`,
    tags: ['Animals'],
    summary: 'Busca um amiguinho por ID',
    request: {
      params: z.object({
        id: z.string().openapi({ description: 'ID do amiguinho', example: '1' })
      })
    },
    responses: {
      200: {
        description: messages.foundById,
        content: {
          'application/json': {
            schema: ResponseSchema.success(AnimalValidations.create)
          }
        }
      },
      404: {
        description: messages.notFound,
        content: {
          'application/json': {
            schema: ResponseSchema.error(messages.notFound, 404)
          }
        }
      }
    }
  },
  {
    method: 'post',
    path: Endpoint(EndpointNames.ANIMALS),
    tags: ['Animals'],
    summary: 'Cadastra um novo amiguinho',
    request: {
      body: {
        content: { 'application/json': { schema: AnimalValidations.create } }
      }
    },
    responses: {
      201: {
        description: messages.created,
        content: {
          'application/json': {
            schema: ResponseSchema.success(AnimalValidations.create)
          }
        }
      },
      400: {
        description: messages.invalidFields,
        content: {
          'application/json': {
            schema: ResponseSchema.error(messages.invalidFields, 400, [
              {
                field: 'name',
                message: AnimalsValidationMessages.name.required
              }
            ])
          }
        }
      }
    }
  },
  {
    method: 'delete',
    path: `${Endpoint(EndpointNames.ANIMALS)}/{id}`,
    tags: ['Animals'],
    summary: 'Deleta um amiguinho por ID',
    request: {
      params: z.object({
        id: z.string().openapi({ description: 'ID do amiguinho', example: '1' })
      })
    },
    responses: {
      200: {
        description: messages.deleted,
        content: {
          'application/json': {
            schema: ResponseSchema.success(AnimalValidations.create)
          }
        }
      },
      404: {
        description: messages.notFoundToDelete,
        content: {
          'application/json': {
            schema: ResponseSchema.error(messages.notFoundToDelete, 404)
          }
        }
      }
    }
  },
  {
    method: 'patch',
    path: `${Endpoint(EndpointNames.ANIMALS)}/{id}`,
    tags: ['Animals'],
    summary: 'Atualiza um amiguinho por ID',
    request: {
      params: z.object({
        id: z.string().openapi({ description: 'ID do amiguinho', example: '1' })
      }),
      body: {
        content: { 'application/json': { schema: AnimalValidations.update } }
      }
    },
    responses: {
      200: {
        description: messages.updated,
        content: {
          'application/json': {
            schema: ResponseSchema.success(AnimalValidations.create)
          }
        }
      },
      400: {
        description: messages.invalidFields,
        content: {
          'application/json': {
            schema: ResponseSchema.error(messages.invalidFields, 400, [
              {
                field: 'name',
                message: AnimalsValidationMessages.name.required
              }
            ])
          }
        }
      },
      404: {
        description: messages.notFoundToUpdate,
        content: {
          'application/json': {
            schema: ResponseSchema.error(messages.notFoundToUpdate, 404)
          }
        }
      }
    }
  }
]
