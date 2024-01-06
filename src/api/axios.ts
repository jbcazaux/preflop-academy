import axiosLib, { AxiosInstance } from 'axios'

let instance: AxiosInstance | null = null

const axios = (): AxiosInstance => {
  if (instance) return instance
  instance = axiosLib.create({
    timeout: 15000,
    baseURL: `${process.env.NEXT_PUBLIC_URL}/api`,
  })
  return instance
}

export default axios
