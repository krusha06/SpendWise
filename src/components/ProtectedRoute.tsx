import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'

interface Props {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = '/login'
    }
  }, [user, isLoading])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    )
  }

  if (!user) return null

  return <>{children}</>
}