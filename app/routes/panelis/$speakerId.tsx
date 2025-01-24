import { createFileRoute, Link } from '@tanstack/react-router'
import Container from '~/components/Container'
import EpisodeCard from '~/components/EpisodeCard'
import * as api from '~/services/requests'
import { clx, removeHtmlTags, getSpeakerNickname } from '~/utils/helpers'
import { seo } from '~/utils/seo'
import Speaker from '~/components/Speaker'



export const Route = createFileRoute('/panelis/$speakerId')({
  component: RouteComponent,
  loader: async ({ params: { speakerId } }) => {
    const speaker = await api.fetchSpeaker(speakerId)

    return { speaker }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}

    const { speaker } = loaderData

    return {
      meta: [...seo({
        title: `${speaker.name} (${getSpeakerNickname(speaker)})`,
        description: removeHtmlTags(speaker.bio),
        image: speaker.cdnImageUrl,
      }),
      ]
    }
  },
})

function RouteComponent() {
  const { speaker } = Route.useLoaderData()

  return (
    <Container>
      <Speaker speaker={speaker} className="mb-12" />

      {speaker.episodes.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold mb-6 text-tt-blue">Epizòd</h2>
          <div className="mb-12">
            {speaker.episodes.map((episode, index) => (
              <EpisodeCard key={episode.id} episode={episode}
                className={clx({
                  'mb-4': index !== speaker.episodes.length - 1,
                })}
              />
            ))}
          </div>
        </div>
      )}
    </Container>
  )


}
