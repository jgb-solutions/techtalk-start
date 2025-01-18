import { SITE_NAME } from "~/utils/constants"
import Container from "./Container"
import { Link } from "@tanstack/react-router"
import Socials from "./Socials"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <Container className="flex items-center justify-between">
        <Link to="/"><img className="w-24 mb-4" src="/assets/images/techtalk-logo@4x.png" alt={SITE_NAME} /></Link>
        <div className="flex flex-col items-center sm:items-end">
          <Socials />
          <p className="font-medium">&copy; 2025</p>
        </div>
      </Container>
    </footer>
  )
}