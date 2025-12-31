import { useState } from "react"

import { useEffect } from "react"

import type { ReactNode } from 'react'

export default function ClientOnly({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return show ? children : null
}
