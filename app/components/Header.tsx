import { APP_NAME } from "~/utils/constants"
import Container from "./Container"
import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="bg-black rounded-br-none">
      <Container className="flex mb-8">
        <Link to="/" className="w-1/3 mr-4" title={APP_NAME}>
          <img className="max-w-full w-24" src="/assets/images/techtalk-logo.svg" alt={APP_NAME} />
        </Link>
        <nav className="flex items-center justify-end flex-1">
          {/* <Link className="btn btn-info shadow-lg" to="/epizod">Epizòd</Link> */}
          <Link className="btn btn-info shadow-lg ml-2" to="/panelis">Panelis</Link>
          <Link className="btn btn-info shadow-lg ml-2" to="/ekip">Ekip</Link>
          <Link className="btn btn-info shadow-lg ml-2" to="/kontak">Kontak</Link>
        </nav>
      </Container>
    </header>
  )
}