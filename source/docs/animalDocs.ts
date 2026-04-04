import { AnimalValidations } from '../validation/animalValidation'
import { RouteConfig } from '@asteasolutions/zod-to-openapi'
import { Endpoints } from '../global/endpoints'
import { z } from '../config/zod'
import { ResponseSchema } from './responseSchema'

export const animalDocs: Array<RouteConfig> = [
  {
    method: 'get',
    path: Endpoints.ANIMALS,
    tags: ['Animals'],
    summary: 'Lista todos os amiguinhos',
    responses: {
      200: {
        description: 'Amiguinhos listados com sucesso',
        content: {
          'application/json': {
            schema: ResponseSchema.success(z.array(AnimalValidations.create))
          }
        }
      },
      404: {
        description: 'Erro ao listar amiguinhos',
        content: {
          'application/json': {
            schema: ResponseSchema.error('Nenhum amiguinho encontrado', 404)
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
        description: 'Amiguinho encontrado com sucesso',
        content: {
          'application/json': {
            schema: ResponseSchema.success(AnimalValidations.create)
          }
        }
      },
      404: {
        description: 'Nenhum amiguinho encontrado',
        content: {
          'application/json': {
            schema: ResponseSchema.error('Nenhum amiguinho encontrado', 404)
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
        description: 'Amiguinho cadastrado com sucesso',
        content: {
          'application/json': {
            schema: ResponseSchema.success(AnimalValidations.create)
          }
        }
      },
      400: {
        description: 'Erro ao criar amiguinho',
        content: {
          'application/json': {
            schema: ResponseSchema.error(
              'Campos inválidos ao cadastrar amiguinho',
              400,
              { field: 'name', message: 'Nome é obrigatório' }
            )
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
        description: 'Amiguinho deletado com sucesso',
        content: {
          'application/json': {
            schema: ResponseSchema.success(AnimalValidations.create)
          }
        }
      },
      404: {
        description: 'Nenhum amiguinho encontrado',
        content: {
          'application/json': {
            schema: ResponseSchema.error('Nenhum amiguinho encontrado', 404)
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
        description: 'Amiguinho atualizado com sucesso',
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
            schema: ResponseSchema.error('Campos inválidos', 400, {
              field: 'name',
              message: 'Nome é obrigatório'
            })
          }
        }
      },
      404: {
        description: 'Nenhum amiguinho encontrado',
        content: {
          'application/json': {
            schema: ResponseSchema.error('Nenhum amiguinho encontrado', 404)
          }
        }
      }
    }
  }
]
