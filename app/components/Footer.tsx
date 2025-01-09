import { APP_NAME } from "~/utils/constants"
import Container from "./Container"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <Container className="flex items-center justify-between">
        <a href="/"><img className="w-24 mb-4" src="/assets/images/techtalk-logo@4x.png" alt={APP_NAME} /></a>

        <p className="font-medium">&copy; 2025</p>
      </Container>
    </footer>
  )
}