'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCreateUserMutation } from '@/data'
import LoadingIndicator from '@/components/LoadingIndicator'
import SuccessIndicator from '@/components/SuccessIndicator'
import UserEditorForm, { UserFormSchema } from '@/components/UserEditorForm'
import { User } from '@/api'

export default function AddUserPage() {
  const [showSuccessIndicator, setShowSuccessIndicator] = useState(false)
  const successIndicatorTimerRef = useRef<NodeJS.Timeout | null>(null)

  const router = useRouter()

  const createUserMutation = useCreateUserMutation({
    onSuccess: (user: User) => {
      setShowSuccessIndicator(true)
      successIndicatorTimerRef.current = setTimeout(() => {
        setShowSuccessIndicator(false)
        router.replace(`/users/${user.id}`)
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

  const user: Pick<User, 'first_name' | 'last_name' | 'status'> = {
    first_name: '',
    last_name: '',
    status: 'active',
  }

  function handleSubmit(params: UserFormSchema) {
    createUserMutation.mutate(params)
  }

  return (
    <>
      <div className="relative m-2 overflow-hidden rounded-lg border border-slate-100 dark:border-slate-900 md:w-3/4 lg:w-1/2">
        {createUserMutation.isLoading && <LoadingIndicator className="absolute left-0 right-0 m-auto mt-8" />}
        {showSuccessIndicator && <SuccessIndicator className="absolute left-0 right-0 m-auto mt-8" />}
        <UserEditorForm
          user={user}
          errors={createUserMutation.error}
          isLoading={createUserMutation.isLoading}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  )
}
