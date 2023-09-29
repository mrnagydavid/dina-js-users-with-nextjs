'use client'

import { notFound } from 'next/navigation'
import LoadingIndicator from '@/components/LoadingIndicator'
import { useGetUserQuery } from '@/data'
import Link from 'next/link'

export default function UserPage(props: UserPageProps) {
  const { userId: userIdParam } = props.params
  const userId = parseInt(userIdParam)

  if (isNaN(userId)) {
    notFound()
  }

  const { data, isLoading, isFetching } = useGetUserQuery(userId)

  const user = data!

  return (
    <>
      <div className="relative m-2 overflow-hidden rounded-lg border border-slate-100 dark:border-slate-900 md:w-3/4 lg:w-1/2">
        {(isLoading || isFetching) && <LoadingIndicator className="absolute left-0 right-0 m-auto" />}

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
              <td className="overflow-hidden text-ellipsis p-2 text-left">{user.first_name}</td>
            </tr>
            <tr className="bg-slate-300 hover:bg-slate-400 dark:bg-slate-600">
              <th scope="row" className="p-2 text-left">
                Last name
              </th>
              <td className="overflow-hidden text-ellipsis p-2 text-left">{user.last_name}</td>
            </tr>
            <tr className="bg-slate-300 hover:bg-slate-400 dark:bg-slate-600">
              <th scope="row" className="p-2 text-left">
                Created at
              </th>
              <td className="overflow-hidden text-ellipsis p-2 text-left">{user.created_at}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-2 flex justify-center align-middle md:w-3/4 lg:w-1/2">
        <Link href={`/users/${userId}/edit`}>
          <button
            type="button"
            className="min-w-14 w-fit border-slate-100 bg-slate-300 p-2 hover:bg-slate-400 dark:border-slate-700 dark:bg-slate-600"
          >
            Edit user
          </button>
        </Link>
      </div>
    </>
  )
}

type UserPageProps = { params: { userId: string } }
