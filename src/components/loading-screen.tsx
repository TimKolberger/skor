import { AppLayout, AppLayoutContent, AppLayoutHeader } from '../layout/layout'
import { useEffect, useState } from 'react'
import { FiLoader } from 'react-icons/fi'

export const LoadingScreen = () => {
  return (
    <AppLayout>
      <AppLayoutHeader />
      <AppLayoutContent variant="max-width">
        <Loading />
      </AppLayoutContent>
    </AppLayout>
  )
}

const Loading = () => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(true)
    }, 250)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  if (!isLoading) {
    return null
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <FiLoader className="animate-[spin_2.2s_linear_infinite] text-5xl" />
    </div>
  )
}
