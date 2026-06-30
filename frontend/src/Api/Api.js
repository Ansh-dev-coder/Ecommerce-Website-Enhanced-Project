import axios from 'axios'

const baseURL = import.meta.env.DEV
  ? '/api'
  : `${import.meta.env.VITE_BACK_END_URL}/api`

const api = axios.create({
  baseURL,
  withCredentials: true,
})

export default api