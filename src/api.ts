import axios from 'axios'

const BASE_URL = 'https://assessment-users-backend-node.herokuapp.com/users'

export async function getUsers(params: GetUsersParams = {}) {
  const result = await axios.get(BASE_URL, {
    params: {
      page: params.page ?? 1,
      page_size: params.page_size ?? 10,
    },
  })

  return result.data as GetUsersResponse
}

export async function getUser(id: number) {
  const result = await axios.get(`${BASE_URL}/${id}`)
  return result.data
}

export type GetUsersParams = {
  page?: number
  page_size?: number
}

export type GetUsersResponse = {
  data: Array<User>
  meta: {
    count: number
    page: number
    page_size: number
  }
}

export type User = {
  id: number
  first_name: string
  last_name: string
  status: string
  created_at: string
  updated_at: string
}
