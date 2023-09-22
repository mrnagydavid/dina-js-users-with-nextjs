'use client'
import { useState } from 'react'

export default function UsersPage() {
  const [page, setPage] = useState(1)

  return (
    <>
      <div className="m-2 overflow-hidden rounded-lg border border-slate-100 dark:border-slate-900 md:w-3/4 lg:w-1/2">
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
          <tbody>
            <tr className="bg-slate-200 hover:bg-slate-400  dark:bg-slate-700">
              <td className="p-2 text-left">John</td>
              <td className="p-2 text-left">Wick</td>
              <td className="p-2 text-left">2023-05-19 12:04:01</td>
            </tr>
            <tr className="bg-slate-300 hover:bg-slate-400 dark:bg-slate-600">
              <td className="p-2 text-left">John</td>
              <td className="p-2 text-left">Wick</td>
              <td className="p-2 text-left">2023-05-19 12:04:01</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Paginator
        pageCount={100}
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
