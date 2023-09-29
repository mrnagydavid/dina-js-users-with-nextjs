import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PostUserBadInputError, PutUserBadInputError, User } from '@/api'

export default function UserEditorForm(props: UserEditorFormProps) {
  const { user, errors, isLoading, onSubmit } = props

  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      status: user.status,
    },
  })

  useEffect(() => {
    form.reset(user)
  }, [user])

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  disabled={isLoading}
                />
                {form.formState.errors.first_name && (
                  <div className="text-red-500">{form.formState.errors.first_name.message}</div>
                )}
                {errors?.first_name && <div className="text-red-500">{errors.first_name}</div>}
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
                  disabled={isLoading}
                />
                {form.formState.errors.last_name && (
                  <div className="text-red-500">{form.formState.errors.last_name.message}</div>
                )}
                {errors?.last_name && <div className="text-red-500">{errors.last_name}</div>}
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
                  disabled={isLoading}
                >
                  <option value="active">Active</option>
                  <option value="locked">Locked</option>
                </select>
                {form.formState.errors.status && (
                  <div className="text-red-500">{form.formState.errors.status.message}</div>
                )}
                {errors?.status && <div className="text-red-500">{errors.status}</div>}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="my-2 flex justify-center align-middle">
          <button
            type="submit"
            className="min-w-14 w-fit border-slate-100 bg-slate-300 p-2 hover:bg-slate-400 dark:border-slate-700 dark:bg-slate-600"
            disabled={isLoading}
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

export type UserFormSchema = z.infer<typeof userFormSchema>

type UserEditorFormProps = {
  user: Pick<User, 'first_name' | 'last_name' | 'status'>
  errors?: PostUserBadInputError | PutUserBadInputError | null
  isLoading: boolean
  onSubmit: (params: UserFormSchema) => void
}
