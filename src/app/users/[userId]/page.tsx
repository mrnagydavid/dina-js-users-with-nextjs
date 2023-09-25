'use client'
import { notFound } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getUser, User } from '@/api'
import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator'

export default function UserPage(props: UserPageProps) {
  const { userId: userIdParam } = props.params
  const userId = parseInt(userIdParam)

  if (isNaN(userId) || userId < 0) {
    notFound()
  }

  const { data, isLoading } = useQuery(['users', userId], () => getUser(userId))

  const user: User = isLoading ? { first_name: 'n/a', last_name: 'n/a', created_at: 'n/a' } : data

  return (
    <>
      <div className="relative m-2 overflow-hidden rounded-lg border border-slate-100 dark:border-slate-900 md:w-3/4 lg:w-1/2">
        {isLoading && <LoadingIndicator className="absolute left-0 right-0 m-auto" />}

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
    </>
  )
}

type UserPageProps = { params: { userId: string } }
