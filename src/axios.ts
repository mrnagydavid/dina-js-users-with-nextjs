import axiosModule, { AxiosError, AxiosInstance, AxiosRequestConfig, isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'

let axios = axiosModule.create()

export default {
  get: (url: string, config?: AxiosRequestConfig<any>) => getWrapper(axios, url, config),
  post: (url: string, data?: any, config?: AxiosRequestConfig<any>) => postWrapper(axios, url, data, config),
  put: (url: string, data?: any, config?: AxiosRequestConfig<any>) => putWrapper(axios, url, data, config),
}

async function getWrapper<SuccessType, ErrorType>(axios: AxiosInstance, url: string, config?: AxiosRequestConfig<any>) {
  try {
    const response = await axios.get(url, config)
    return {
      success: true,
      data: response.data,
    }
  } catch (error: any) {
    if (isAxiosError(error)) {
      handleAxiosError(error)
    }

    throw error
  }
}

async function postWrapper(axios: AxiosInstance, url: string, data?: any, config?: AxiosRequestConfig<any>) {
  try {
    const response = await axios.post(url, data, config)
    return {
      success: true,
      data: response.data,
    }
  } catch (error: any) {
    if (isAxiosError(error)) {
      handleAxiosError(error)
    }

    throw error
  }
}

async function putWrapper(axios: AxiosInstance, url: string, data?: any, config?: AxiosRequestConfig<any>) {
  try {
    const response = await axios.put(url, data, config)
    return {
      success: true,
      data: response.data,
    }
  } catch (error: any) {
    if (isAxiosError(error)) {
      handleAxiosError(error)
    }

    throw error
  }
}

function handleAxiosError(error: AxiosError<any>) {
  let axiosError = error as AxiosError<any>

  if (axiosError.response?.status === 400) {
    const error = parseBadInputError(axiosError.response?.data)
    throw error
  }

  if (axiosError.response?.status === 404) {
    throw 'NOT_FOUND'
  }

  throw axiosError
}

function parseBadInputError(errors: any[]) {
  return errors.reduce((acc, error) => {
    const field = error.path[0]

    if (!acc[field]) {
      acc[field] = []
    }

    acc[field].push(error.message)

    return acc
  }, {})
}
