export default function UsersPage() {
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
    </>
  )
}
