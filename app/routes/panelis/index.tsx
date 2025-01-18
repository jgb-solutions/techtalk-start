import { createFileRoute } from '@tanstack/react-router'
import Container from '~/components/Container'
import Speaker from '~/components/Speaker'
import Title from '~/components/Title'
import * as api from '~/services/requests'
import { clx } from '~/utils/helpers'

export const Route = createFileRoute('/panelis/')({
  component: Home,
  loader: async () => {
    const speakers = await api.fetchSpeakers()

    return { speakers }
  },
})

function Home() {
  const { speakers } = Route.useLoaderData()

  return (
    <Container>
      <Title className="text-tt-blue">
        <span className="font-thin">Tech Talk:</span>
        <span className="font-medium">Panelis</span>
      </Title>

      <article className="mb-12">
        {speakers.map((speaker, index) => (
          <Speaker
            key={speaker.id}
            speaker={speaker}
            className={clx({
              'mb-4': index !== speakers.length - 1,
            })}
          />
        ))}
      </article>
    </Container>
  )
}
