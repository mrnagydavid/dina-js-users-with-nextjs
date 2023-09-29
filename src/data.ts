import { useQuery, useMutation } from '@tanstack/react-query'
import {
  getUsers,
  getUser,
  postUser,
  putUser,
  GetUsersParams,
  GetUsersResponse,
  GetUserSuccess,
  PostUserParams,
  PostUserBadInputError,
  PostUserSuccess,
  PutUserSuccess,
  PutUserBadInputError,
  PutUserParams,
  User,
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

export function useGetUserQuery(userId: number) {
  const query = useQuery<GetUserSuccess, any>({
    queryKey: ['users', userId],
    queryFn: () => getUser(userId),
    placeholderData: {
      id: 0,
      first_name: 'n/a',
      last_name: 'n/a',
      status: 'active',
      created_at: 'n/a',
      updated_at: 'n/a',
    },
  })

  if (query.error === 'NOT_FOUND') {
    notFound()
  }

  return query
}

export function useCreateUserMutation(params: UseCreateUserMutationParams = {}) {
  return useMutation<PostUserSuccess, PostUserBadInputError, PostUserParams>({
    mutationFn: (params: PostUserParams) => postUser(params),
    onSuccess: params.onSuccess,
  })
}

export function useUpdateUserMutation(params: UseUpdateUserMutationParams = {}) {
  return useMutation<PutUserSuccess, PutUserBadInputError, PutUserParams>({
    mutationFn: (params: PutUserParams) => putUser(params),
    onSuccess: params.onSuccess,
  })
}

export type UseCreateUserMutationParams = {
  onSuccess?: (data: User, variables: PostUserParams, context: any) => void
}

export type UseUpdateUserMutationParams = {
  onSuccess?: (data: User, variables: PutUserParams, context: any) => void
}
