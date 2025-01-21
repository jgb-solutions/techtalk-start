import React from 'react'

export default function RunInProduction({ children }: { children: React.ReactNode }) {
  const isProduction = process.env.NODE_ENV === 'production'

  if (isProduction) {
    return <>{children}</>
  }

  return null
}
