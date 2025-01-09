import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/panelis/$speakerId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/panelis/$speakerId"!</div>
}
