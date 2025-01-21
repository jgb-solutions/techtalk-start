import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from "react"

import { SITE_NAME } from "~/utils/constants"
import Container from "./Container"
import { clx } from '~/utils/helpers'

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [shouldBeSticky, setShouldBeSticky] = useState(false)

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

  return (
    <header className={clx("bg-black rounded-br-none transition ease-in-out delay-150",
      {
        "sticky top-0 bg-opacity-90": shouldBeSticky
      })} ref={headerRef}>
      <Container className="flex mb-8">
        <Link to="/" className="w-1/3 mr-4" title={SITE_NAME}>
          <img className="max-w-full w-24" src="/assets/images/techtalk-logo.svg" alt={SITE_NAME} />
        </Link>
        <nav className="flex items-center justify-end flex-1">
          <Link className="btn btn-info shadow-lg" to="/">Epizòd</Link>
          <Link className="btn btn-info shadow-lg ml-2" to="/panelis">Panelis</Link>
          {/* <Link className="btn btn-info shadow-lg ml-2" to="/ekip">Ekip</Link> */}
          <Link className="btn btn-info shadow-lg ml-2" to="/kontak">Kontak</Link>
        </nav>
      </Container>
    </header>
  )
}