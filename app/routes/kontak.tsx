import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/kontak')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/kontak"!</div>
}
