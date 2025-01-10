import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ekip')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/ekip"!</div>
}
