import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useRef, useState } from "react"

import { SITE_NAME } from "~/utils/constants"
import Container from "./Container"
import { clx } from '~/utils/helpers'
import { useLoadingBar } from 'react-top-loading-bar'

/** Top navigation (the current page is highlighted in the brand orange). */
const NAV = [
  ['/', 'Epizòd'],
  ['/panelis', 'Panelis'],
  ['/kontak', 'Kontak'],
] as const

export default function Header() {
  const routerState = useRouterState()
  const headerRef = useRef<HTMLDivElement>(null)
  const [shouldBeSticky, setShouldBeSticky] = useState(false)
  const { start, complete } = useLoadingBar({ color: "#ffa30a", height: 2 })

  function handleResize() {
    if (!headerRef.current) return

    if (window.scrollY > headerRef.current?.clientHeight) {
      setShouldBeSticky(true)
    } else {
      setShouldBeSticky(false)
    }
  }

  useEffect(() => {
    handleResize()

    window.addEventListener("scroll", handleResize)

    return () => {
      window.removeEventListener("scroll", handleResize)
    }
  }, [])

  useEffect(() => {
    if (routerState.isLoading) {
      start()
    } else {
      complete()
    }
  }, [routerState.isLoading])

  return (
    <header className={clx("bg-black rounded-br-none transition ease-in-out delay-150",
      {
        "sticky top-0 bg-opacity-90": shouldBeSticky
      })} ref={headerRef}>
      <Container className="flex items-center">
        <Link to="/" className="w-1/3 mr-4" title={SITE_NAME}>
          <img className="max-w-full w-24" src="/assets/images/techtalk-logo.svg" alt={SITE_NAME} />
        </Link>
        <nav aria-label="Main" className="flex items-center justify-end flex-1 gap-2">
          {NAV.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === '/' }}
              className="rounded-full px-4 py-2 text-sm font-semibold text-white/85 ring-1 ring-white/20 transition hover:bg-white/10 hover:text-white"
              activeProps={{ className: '!bg-tt-yellow !text-black !ring-tt-yellow', 'aria-current': 'page' }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  )
}