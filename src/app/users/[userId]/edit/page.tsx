'use client'

import { useEffect, useRef, useState } from 'react'
import { notFound, useRouter } from 'next/navigation'
import { useUpdateUserMutation, useGetUserQuery } from '@/data'
import LoadingIndicator from '@/components/LoadingIndicator'
import SuccessIndicator from '@/components/SuccessIndicator'
import UserEditorForm, { UserFormSchema } from '@/components/UserEditorForm'

export default function EditUserPage(props: EditUserPageProps) {
  const { userId: userIdParam } = props.params
  const userId = parseInt(userIdParam)

  const router = useRouter()

  if (isNaN(userId)) {
    notFound()
  }

  const userQuery = useGetUserQuery(userId)
  const [showSuccessIndicator, setShowSuccessIndicator] = useState(false)
  const successIndicatorTimerRef = useRef<NodeJS.Timeout | null>(null)

  const updateUserMutation = useUpdateUserMutation({
    onSuccess: () => {
      setShowSuccessIndicator(true)
      successIndicatorTimerRef.current = setTimeout(() => {
        setShowSuccessIndicator(false)
        router.push(`/users/${userId}`)
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

  const user = userQuery.data!

  function handleSubmit(params: UserFormSchema) {
    updateUserMutation.mutate({
      id: userId,
      ...params,
    })
  }

  return (
    <>
      <div className="relative m-2 overflow-hidden rounded-lg border border-slate-100 dark:border-slate-900 md:w-3/4 lg:w-1/2">
        {(userQuery.isFetching || updateUserMutation.isLoading) && (
          <LoadingIndicator className="absolute left-0 right-0 m-auto mt-8" />
        )}
        {showSuccessIndicator && <SuccessIndicator className="absolute left-0 right-0 m-auto mt-8" />}
        <UserEditorForm
          user={user}
          errors={updateUserMutation.error}
          isLoading={userQuery.isFetching || updateUserMutation.isLoading}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  )
}

type EditUserPageProps = { params: { userId: string } }
