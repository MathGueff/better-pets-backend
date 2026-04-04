import { AnimalValidations } from '../validation/animalValidation'
import { RouteConfig } from '@asteasolutions/zod-to-openapi'
import { Endpoints } from '../global/endpoints'
import { z } from '../config/zod'
import { ResponseSchema } from './responseSchema'
import { AnimalMessages } from '../messages/animalsMessages'

const messages = AnimalMessages

export const animalDocs: Array<RouteConfig> = [
  {
    method: 'get',
    path: Endpoints.ANIMALS,
    tags: ['Animals'],
    summary: 'Lista todos os amiguinhos',
    responses: {
      200: {
        description: messages.FOUND,
        content: {
          'application/json': {
            schema: ResponseSchema.success(z.array(AnimalValidations.create))
          }
        }
      },
      404: {
        description: messages.NOT_FOUND,
        content: {
          'application/json': {
            schema: ResponseSchema.error(messages.NOT_FOUND, 404)
          }
        }
      }
    }
  },
  {
    method: 'get',
    path: `${Endpoints.ANIMALS}/{id}`,
    tags: ['Animals'],
    summary: 'Busca um amiguinho por ID',
    request: {
      params: z.object({
        id: z.string().openapi({ description: 'ID do amiguinho', example: '1' })
      })
    },
    responses: {
      200: {
        description: messages.FOUND_BY_ID,
        content: {
          'application/json': {
            schema: ResponseSchema.success(AnimalValidations.create)
          }
        }
      },
      404: {
        description: messages.NOT_FOUND,
        content: {
          'application/json': {
            schema: ResponseSchema.error(messages.NOT_FOUND, 404)
          }
        }
      }
    }
  },
  {
    method: 'post',
    path: Endpoints.ANIMALS,
    tags: ['Animals'],
    summary: 'Cadastra um novo amiguinho',
    request: {
      body: {
        content: { 'application/json': { schema: AnimalValidations.create } }
      }
    },
    responses: {
      201: {
        description: messages.CREATED,
        content: {
          'application/json': {
            schema: ResponseSchema.success(AnimalValidations.create)
          }
        }
      },
      400: {
        description: messages.INVALID_FIELDS,
        content: {
          'application/json': {
            schema: ResponseSchema.error(messages.INVALID_FIELDS, 400, [
              { field: 'name', message: 'Nome é obrigatório' }
            ])
          }
        }
      }
    }
  },
  {
    method: 'delete',
    path: `${Endpoints.ANIMALS}/{id}`,
    tags: ['Animals'],
    summary: 'Deleta um amiguinho por ID',
    request: {
      params: z.object({
        id: z.string().openapi({ description: 'ID do amiguinho', example: '1' })
      })
    },
    responses: {
      200: {
        description: messages.DELETED,
        content: {
          'application/json': {
            schema: ResponseSchema.success(AnimalValidations.create)
          }
        }
      },
      404: {
        description: messages.NOT_FOUND_TO_DELETE,
        content: {
          'application/json': {
            schema: ResponseSchema.error(messages.NOT_FOUND_TO_DELETE, 404)
          }
        }
      }
    }
  },
  {
    method: 'patch',
    path: `${Endpoints.ANIMALS}/{id}`,
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
        description: messages.UPDATED,
        content: {
          'application/json': {
            schema: ResponseSchema.success(AnimalValidations.create)
          }
        }
      },
      400: {
        description: messages.INVALID_FIELDS,
        content: {
          'application/json': {
            schema: ResponseSchema.error(messages.INVALID_FIELDS, 400, [
              { field: 'name', message: 'Nome é obrigatório' }
            ])
          }
        }
      },
      404: {
        description: messages.NOT_FOUND_TO_UPDATE,
        content: {
          'application/json': {
            schema: ResponseSchema.error(messages.NOT_FOUND_TO_UPDATE, 404)
          }
        }
      }
    }
  }
]
