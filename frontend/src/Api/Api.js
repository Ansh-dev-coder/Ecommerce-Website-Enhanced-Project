import axios from 'axios'

const baseURL = import.meta.env.DEV
  ? '/api'
  : `${import.meta.env.VITE_BACK_END_URL}/api`

const api = axios.create({
  baseURL,
  withCredentials: true,
})

const getStoredJwtToken = () => {
  const auth = localStorage.getItem('auth')

  if (!auth) {
    return null
  }

  try {
    const parsedAuth = JSON.parse(auth)
    const token = parsedAuth?.token || parsedAuth?.jwtToken || parsedAuth?.accessToken

    if (token) {
      return token
    }

    const jwtCookie = parsedAuth?.jwtCookie

    if (!jwtCookie) {
      return null
    }

    return jwtCookie.split(';')[0]?.split('=')[1] || null
  } catch {
    return null
  }
}

api.interceptors.request.use((config) => {
  const token = getStoredJwtToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
