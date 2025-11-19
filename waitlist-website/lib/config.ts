type ApiConfig = {
  BACKEND_URL: string
}

const DEFAULT_BACKEND = 'http://127.0.0.1:8000'

export const getApiConfig = (): ApiConfig => {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.BACKEND_URL ||
    DEFAULT_BACKEND

  return {
    BACKEND_URL: backendUrl.replace(/\/$/, ''),
  }
}

export const API_CONFIG = getApiConfig()
