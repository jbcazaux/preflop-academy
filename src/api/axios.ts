import axiosLib, { AxiosInstance } from 'axios'

let instance: AxiosInstance | null = null

const axios = (): AxiosInstance => {
  if (instance) return instance
  instance = axiosLib.create({
    timeout: 30000,
    baseURL: '/api',
  })
  return instance
}

export default axios
