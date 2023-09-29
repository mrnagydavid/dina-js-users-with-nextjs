'use client'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { User } from '@/api'
import LoadingIndicator from '@/components/LoadingIndicator'
import { useGetUsersQuery } from '@/data'

export default function UsersPage() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const queryParamPageString = searchParams.get('page')
  const page = parseInt(queryParamPageString ?? '1')

  const { data, isLoading, isPreviousData } = useGetUsersQuery({ page })

  const users = data?.data ?? []
  const meta = data?.meta ?? { count: 1, page_size: 10 }
  const pageCount = Math.ceil(meta.count / meta.page_size)

  function handlePageChange(requestedPage: number) {
    router.push(`/users?page=${requestedPage}`)
  }

  return (
    <>
      <div className="relative m-2 overflow-hidden rounded-lg border border-slate-100 dark:border-slate-900 md:w-3/4 lg:w-1/2">
        {(isLoading || isPreviousData) && <LoadingIndicator className="absolute left-0 right-0 m-auto mt-8" />}

        <table className="w-full table-fixed">
          <thead className="border-b-2 bg-slate-400 dark:bg-slate-800">
            <tr>
              <th scope="col" className="w-3/12 p-2 text-left">
                First name
              </th>
              <th scope="col" className="w-3/12 p-2 text-left">
                Last name
              </th>
              <th scope="col" className="w-6/12 p-2 text-left">
                Created at
              </th>
            </tr>
          </thead>
          <tbody className="h-96">
            {users.length === 0 && (
              <tr>
                <td colSpan={3}>&nbsp;</td>
              </tr>
            )}
            {users.map((user) => (
              <User key={'user' + user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      <Paginator
        pageCount={pageCount}
        currentPage={page}
        containerClassName="w-full md:w-3/4 lg:w-1/2 flex flex-row justify-between"
        stepperClassName="flex-none w-12 h-12 flex items-center justify-center cursor-pointer"
        itemClassName="w-12 h-12 flex items-center justify-center cursor-pointer"
        breakClassName="w-12 h-12 flex items-center justify-center"
        currentPageItemClassName="font-bold"
        handlePageChange={handlePageChange}
      />

      <div className="mt-2 flex justify-center align-middle md:w-3/4 lg:w-1/2">
        <Link href="/users/new">
          <button
            type="button"
            className="min-w-14 w-fit border-slate-100 bg-slate-300 p-2 hover:bg-slate-400 dark:border-slate-700 dark:bg-slate-600"
          >
            Add new user
          </button>
        </Link>
      </div>
    </>
  )
}

function User(props: UserProps) {
  const { user } = props
  const router = useRouter()

  return (
    <tr
      key={'user' + user.id}
      className="cursor-pointer bg-slate-300 hover:bg-slate-400 dark:bg-slate-600"
      onClick={() => router.push('/users/' + user.id)}
    >
      <td className="p-2 text-left">{user.last_name}</td>
      <td className="p-2 text-left">{user.first_name}</td>
      <td className="p-2 text-left">{user.created_at}</td>
    </tr>
  )
}

type UserProps = {
  key: string
  user: User
}

function Paginator(props: PaginatorProps) {
  const {
    pageCount,
    currentPage,
    containerClassName,
    stepperClassName,
    itemClassName,
    breakClassName,
    currentPageItemClassName,
    handlePageChange,
  } = props

  const previousPage = Math.max(1, currentPage - 1)
  const nextPage = Math.min(pageCount, currentPage + 1)

  const PageNumberComponents = []

  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
      const className = currentPage === i ? `${itemClassName} ${currentPageItemClassName}` : itemClassName

      PageNumberComponents.push(
        <div key={`page-${i}`} className={className} onClick={() => handlePageChange(i)}>
          {i}
        </div>,
      )
    } else if (i === currentPage - 3 || i === currentPage + 3) {
      PageNumberComponents.push(
        <div key={`page-break-${i}`} className={breakClassName}>
          ...
        </div>,
      )
    }
  }

  return (
    <div className={containerClassName}>
      <div key={`page-back`} className={stepperClassName} onClick={() => handlePageChange(previousPage)}>
        &lt;
      </div>

      {PageNumberComponents}

      <div key={`page-next`} className={stepperClassName} onClick={() => handlePageChange(nextPage)}>
        &gt;
      </div>
    </div>
  )
}

type PaginatorProps = {
  pageCount: number
  currentPage: number
  containerClassName: string
  stepperClassName: string
  itemClassName: string
  breakClassName: string
  currentPageItemClassName: string
  handlePageChange: (requestedPage: number) => void
}
