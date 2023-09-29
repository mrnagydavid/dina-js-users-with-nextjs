import { useQuery, useMutation } from '@tanstack/react-query'
import {
  getUsers,
  getUser,
  postUser,
  GetUsersParams,
  GetUsersResponse,
  GetUserSuccess,
  PostUserParams,
  PostUserBadInputError,
  PostUserSuccess,
} from './api'
import { notFound } from 'next/navigation'

export function useGetUsersQuery(params: GetUsersParams = {}) {
  const page = params.page ?? 1

  return useQuery<GetUsersResponse, any>({
    queryKey: ['users', page],
    queryFn: () => getUsers(params),
    keepPreviousData: true,
  })
}

export function useGetUserQuery(userIdParam: string) {
  const userId = parseInt(userIdParam)

  const query = useQuery<GetUserSuccess, any>({
    queryKey: ['users', userId],
    queryFn: () => getUser(userId),
    placeholderData: {
      id: 0,
      first_name: 'n/a',
      last_name: 'n/a',
      status: 'n/a',
      created_at: 'n/a',
      updated_at: 'n/a',
    },
  })

  if (isNaN(userId) || userId < 0) {
    notFound()
  }

  if (query.error === 'NOT_FOUND') {
    notFound()
  }

  return query
}

export function useCreateUserMutation() {
  return useMutation<PostUserSuccess, PostUserBadInputError, PostUserParams>({
    mutationFn: (params: PostUserParams) => postUser(params),
  })
}
