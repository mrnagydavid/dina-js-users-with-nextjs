'use client'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUsers, User } from '@/api'
import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator'

export default function UsersPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isPreviousData } = useQuery(['users', page], () => getUsers({ page }), {
    keepPreviousData: true,
  })

  const users = data?.data ?? []
  const meta = data?.meta ?? { count: 1, page_size: 10 }
  const pageCount = Math.ceil(meta.count / meta.page_size)

  return (
    <>
      <div className="relative m-2 overflow-hidden rounded-lg border border-slate-100 dark:border-slate-900 md:w-3/4 lg:w-1/2">
        {(isLoading || isPreviousData) && <LoadingIndicator className="absolute left-0 right-0 m-auto" />}

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
        handlePageChange={(requestedPage) => setPage(requestedPage)}
      />
    </>
  )

  function User(props: UserProps) {
    const { key, user } = props

    return (
      <tr key={key} className="bg-slate-300 hover:bg-slate-400 dark:bg-slate-600">
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
}
