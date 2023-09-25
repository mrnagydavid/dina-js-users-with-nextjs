import axios from 'axios'

export async function getUsers(params: GetUsersParams = {}) {
  const result = await axios.get('https://assessment-users-backend-node.herokuapp.com/users', {
    params: {
      page: params.page ?? 1,
      page_size: params.page_size ?? 10,
    },
  })

  return result.data as GetUsersResponse
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
