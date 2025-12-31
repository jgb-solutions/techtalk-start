import { createFileRoute } from '@tanstack/react-router'

import Container from '~/components/Container'
import EpisodeCard from '~/components/EpisodeCard'
import Title from '~/components/Title'
import * as api from '~/services/requests'
import { clx } from '~/utils/helpers'
import { seo } from '~/utils/seo'


export const Route = createFileRoute('/')({
  component: Home,
  loader: () => {
    const episodes = api.fetchEpisodes()

    return { episodes }
  },
  head: () => ({
    meta: [
      ...seo({
        title: "Tech Talk: Dènye Epizòd",
        description: "Tech Talk se yon pòdkas ki pale sou teknoloji an kreyòl.",
      }),
    ]
  }),
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
          <EpisodeCard
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
