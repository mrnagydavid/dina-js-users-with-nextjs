'use client'

import { useEffect, useRef, useState } from 'react'
import { notFound } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateUserMutation, useGetUserQuery } from '@/data'
import LoadingIndicator from '@/components/LoadingIndicator'
import SuccessIndicator from '@/components/SuccessIndicator'

export default function EditUserPage(props: EditUserPageProps) {
  const { userId: userIdParam } = props.params
  const userId = parseInt(userIdParam)

  if (isNaN(userId)) {
    notFound()
  }

  const userQuery = useGetUserQuery(userId)

  const user = userQuery.data!

  const [showSuccessIndicator, setShowSuccessIndicator] = useState(false)
  const successIndicatorTimerRef = useRef<NodeJS.Timeout | null>(null)

  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      status: user.status,
    },
  })

  const updateUserMutation = useUpdateUserMutation({
    onSuccess: () => {
      setShowSuccessIndicator(true)
      successIndicatorTimerRef.current = setTimeout(() => {
        setShowSuccessIndicator(false)
      }, 1500)
    },
  })

  useEffect(() => {
    return () => {
      if (successIndicatorTimerRef.current) {
        clearTimeout(successIndicatorTimerRef.current)
      }
    }
  }, [successIndicatorTimerRef])

  useEffect(() => {
    form.reset(user)
  }, [user])

  function handleSubmit(params: UserFormSchema) {
    updateUserMutation.mutate({
      id: userId,
      ...params,
    })
    form.reset()
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="relative m-2 overflow-hidden rounded-lg border border-slate-100 dark:border-slate-900 md:w-3/4 lg:w-1/2">
          {(userQuery.isFetching || updateUserMutation.isLoading) && (
            <LoadingIndicator className="absolute left-0 right-0 m-auto mt-8" />
          )}
          {showSuccessIndicator && <SuccessIndicator className="absolute left-0 right-0 m-auto mt-8" />}
          <table className="w-full table-fixed">
            <thead className="border-b-2 bg-slate-400 dark:bg-slate-800">
              <tr>
                <th scope="col" className="w-3/12 p-2 text-left">
                  Field name
                </th>
                <th scope="col" className="w-6/12 p-2 text-left">
                  User data
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-slate-300 hover:bg-slate-400 dark:bg-slate-600">
                <th scope="row" className="p-2 text-left">
                  First name
                </th>
                <td className="overflow-hidden text-ellipsis p-2 text-left">
                  <input
                    type="text"
                    className="w-60 bg-slate-100 dark:bg-slate-800"
                    {...form.register('first_name')}
                    disabled={userQuery.isFetching || updateUserMutation.isLoading}
                  />
                  {form.formState.errors.first_name && (
                    <div className="text-red-500">{form.formState.errors.first_name.message}</div>
                  )}
                  {updateUserMutation.error?.first_name && (
                    <div className="text-red-500">{updateUserMutation.error.first_name}</div>
                  )}
                </td>
              </tr>
              <tr className="bg-slate-300 hover:bg-slate-400 dark:bg-slate-600">
                <th scope="row" className="p-2 text-left">
                  Last name
                </th>
                <td className="overflow-hidden text-ellipsis p-2 text-left">
                  <input
                    type="text"
                    className="w-60 bg-slate-100 dark:bg-slate-800"
                    {...form.register('last_name')}
                    disabled={userQuery.isFetching || updateUserMutation.isLoading}
                  />
                  {form.formState.errors.last_name && (
                    <div className="text-red-500">{form.formState.errors.last_name.message}</div>
                  )}
                  {updateUserMutation.error?.last_name && (
                    <div className="text-red-500">{updateUserMutation.error.last_name}</div>
                  )}
                </td>
              </tr>
              <tr className="bg-slate-300 hover:bg-slate-400 dark:bg-slate-600">
                <th scope="row" className="p-2 text-left">
                  Status
                </th>
                <td className="overflow-hidden text-ellipsis p-2 text-left">
                  <select
                    className="w-60 bg-slate-100  dark:bg-slate-800"
                    {...form.register('status')}
                    disabled={userQuery.isFetching || updateUserMutation.isLoading}
                  >
                    <option value="active">Active</option>
                    <option value="locked">Locked</option>
                  </select>
                  {form.formState.errors.status && (
                    <div className="text-red-500">{form.formState.errors.status.message}</div>
                  )}
                  {updateUserMutation.error?.status && (
                    <div className="text-red-500">{updateUserMutation.error.status}</div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-2 flex justify-center align-middle md:w-3/4 lg:w-1/2">
          <button
            type="submit"
            className="min-w-14 w-fit border-slate-100 bg-slate-300 p-2 hover:bg-slate-400 dark:border-slate-700 dark:bg-slate-600"
            disabled={userQuery.isFetching || updateUserMutation.isLoading}
          >
            Make it so!
          </button>
        </div>
      </form>
    </>
  )
}

const userFormSchema = z.object({
  first_name: z.string().trim().min(2, 'The name should be at least 2 characters long.'),
  last_name: z.string().trim().min(2, 'The name should be at least 2 characters long.'),
  status: z.enum(['active', 'locked']),
})

type UserFormSchema = z.infer<typeof userFormSchema>

type EditUserPageProps = { params: { userId: string } }