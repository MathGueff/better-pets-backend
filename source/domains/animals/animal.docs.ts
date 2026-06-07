import { RouteConfig } from '@asteasolutions/zod-to-openapi'
import { z } from '../../config/zod'
import { Endpoint, EndpointNames } from '../../types/endpoints'
import { AnimalValidations } from './animal.validation'
import { ResponseSchema } from '../../validation/response.validation'

export const animalDocs: RouteConfig[] = [
  {
    method: 'get',
    path: Endpoint(EndpointNames.ANIMALS),
    tags: ['Animals'],
    summary: 'Lista todos os amiguinhos',
    responses: {
      200: {
        description: 'Animaizinhos encontrados com sucesso',
        content: {
          'application/json': {
            schema: ResponseSchema.success(z.array(AnimalValidations.create))
          }
        }
      },
      404: {
        description: 'Nenhum animalzinho encontrado',
        content: {
          'application/json': {
            schema: ResponseSchema.error('Nenhum animalzinho encontrado', 404)
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
        description: 'Encontramos seu animalzinho com sucesso',
        content: {
          'application/json': {
            schema: ResponseSchema.success(AnimalValidations.create)
          }
        }
      },
      404: {
        description: 'Nenhum animalzinho encontrado',
        content: {
          'application/json': {
            schema: ResponseSchema.error('Nenhum animalzinho encontrado', 404)
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
        description: 'Animalzinho criado com sucesso',
        content: {
          'application/json': {
            schema: ResponseSchema.success(AnimalValidations.create)
          }
        }
      },
      400: {
        description: 'Campos inválidos',
        content: {
          'application/json': {
            schema: ResponseSchema.error('Campos inválidos', 400, [
              { field: 'name', message: 'Nome é obrigatório' }
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
        description: 'Animalzinho removido com sucesso',
        content: {
          'application/json': {
            schema: ResponseSchema.success(AnimalValidations.create)
          }
        }
      },
      404: {
        description: 'Não foi possível encontrar o animalzinho para excluir',
        content: {
          'application/json': {
            schema: ResponseSchema.error(
              'Não foi possível encontrar o animalzinho para excluir',
              404
            )
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
        description: 'Animalzinho atualizado com sucesso',
        content: {
          'application/json': {
            schema: ResponseSchema.success(AnimalValidations.create)
          }
        }
      },
      400: {
        description: 'Campos inválidos',
        content: {
          'application/json': {
            schema: ResponseSchema.error('Campos inválidos', 400, [
              { field: 'name', message: 'Nome é obrigatório' }
            ])
          }
        }
      },
      404: {
        description: 'Não foi possível encontrar o animalzinho para atualizar',
        content: {
          'application/json': {
            schema: ResponseSchema.error(
              'Não foi possível encontrar o animalzinho para atualizar',
              404
            )
          }
        }
      }
    }
  }
]
