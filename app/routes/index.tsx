import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import Container from '~/components/Container'
import Episode from '~/components/Episode'
import Title from '~/components/Title'
import * as api from '~/services/requests.server'
import { clx } from '~/utils/helpers'

const getEpisodes = createServerFn().handler(async () => {
  const episodes = await api.fetchEpisodes()

  return episodes
})

// const updateCount = createServerFn({ method: 'POST' })
//   .validator((d: number) => d)
//   .handler(async ({ data }) => {
//     return { data: data + 1 }
//   })

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => {
    const episodes = await getEpisodes()
    return { episodes }
  },
})

function Home() {
  const { episodes } = Route.useLoaderData()

  return (
    <Container>
      <Title className="text-tt-blue">
        <span className="font-thin">Tech Talk:</span>
        <span className="font-medium">Dènye Epizòd</span>
      </Title>

      <article className="mb-12">
        {episodes.map((episode, index) => (
          <Episode
            key={episode.id}
            episode={episode}
            className={clx({
              'mb-4': index !== episodes.length - 1,
            })}
          />
        ))}
      </article>
    </Container>
  )
}
