import axios from './axios'

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
  return result.data as User
}

export async function postUser(params: PostUserParams) {
  const result = await axios.post(BASE_URL, params)
  return result.data as PostUserSuccess
}

export async function putUser(params: PutUserParams) {
  const result = await axios.put(`${BASE_URL}/${params.id}`, params)
  return result.data as PutUserSuccess
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

export type GetUserSuccess = User

export type PostUserParams = {
  first_name: string
  last_name: string
  status: string
}

export type PostUserSuccess = User

export type PostUserBadInputError = {
  first_name?: string[]
  last_name?: string[]
  status?: string[]
}

export type PutUserParams = {
  id: number
  first_name: string
  last_name: string
  status: string
}

export type PutUserSuccess = User

export type PutUserBadInputError = {
  first_name?: string[]
  last_name?: string[]
  status?: string
}

export type User = {
  id: number
  first_name: string
  last_name: string
  status: 'active' | 'locked'
  created_at: string
  updated_at: string
}
