import { AxiosInstance } from 'axios'

import getAxios from './axios'

const axios: AxiosInstance = getAxios()

export interface Config {
  DISABLE_PREFLOP_VERSUS_RANGE: boolean
}

export const config = async (): Promise<Config> => {
  const { data } = await axios.get<Config>('/config')
  return data
}
