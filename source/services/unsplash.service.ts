import { ApiError } from '../errors/api.error'

export enum UnsplashContextQuery {
  USERPROFILE = 'userprofile',
  ANIMALPHOTO = 'pet'
}
export class UnsplashService {
  private getFallbackPhoto = () => {
    return 'https://images.unsplash.com/photo-1552053831-71594a27632d'
  }

  private authorization() {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY || ''
    if (!accessKey) {
      throw new ApiError(
        'Chave de accesso inválida para o UNSPLASH',
        500,
        accessKey
      )
    }
    return accessKey
  }
  public takeAPhoto = async (contextQuery: UnsplashContextQuery) => {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${contextQuery}`,
      {
        method: 'GET',
        headers: { Authorization: `Client-ID ${this.authorization()}` }
      }
    )

    if (!response.ok) {
      console.warn('Erro ao acessar a API unsplash', { response })
      return this.getFallbackPhoto()
    }

    const data = await response.json()

    return data?.urls?.raw ?? this.getFallbackPhoto()
  }
}
