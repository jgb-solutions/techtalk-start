import { createFileRoute, Link } from '@tanstack/react-router'
import Container from '~/components/Container'
import Title from '~/components/Title'
import * as api from '~/services/requests.server'
import {
  formatTitle,
  getSpeakerName,
  getYouTubeIdFromUrl,
  itHas,
} from '~/utils/helpers'
import { createServerFn } from '@tanstack/start'
import { seo } from '~/utils/seo'

const getEpisode = createServerFn({
  method: 'GET',
}).validator((data: string) => data).handler(async ctx => {
  const episode = await api.fetchEpisode(ctx.data)

  return episode
})

export const Route = createFileRoute('/epizod/$episodeId')({
  component: EpisodePage,
  loader: async ({ params: { episodeId } }) => {
    // const episode = await getEpisode({ data: episodeId })
    const episode = await api.fetchEpisode(episodeId)


    return { episode }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}

    const { episode } = loaderData

    return {
      meta: [...seo({
        title: episode.title,
        description: episode.description || episode.content,
        image: episode.cdnImageUrl,
      }),
      ]
    }
  },
})

function EpisodePage() {
  const { episode } = Route.useLoaderData()
  const youtubeId = getYouTubeIdFromUrl(episode.youtube)

  return (
    <Container>
      <Title className="text-tt-blue">
        <span className="font-thin">{formatTitle(episode.title)[0]}:</span>
        <br />
        <span className="font-medium">{formatTitle(episode.title)[1]}</span>
      </Title>
      <article className="bg-tt-yellow overflow-hidden shadow-lg rounded-xl">
        {itHas(youtubeId) && (
          <iframe
            className="mb-4 aspect-video w-full"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={episode.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        <div className="p-4">
          {itHas(episode.speakers.length) && (
            <div className="flex flex-row items-center mb-4">
              {/* <h4 className="text-lg mr-3">Panelis:</h4> */}
              <div className="flex flex-row items-center">
                {episode.speakers.map((speaker) => (
                  <Link
                    key={speaker.id}
                    params={{ speakerId: speaker.id }}
                    to={`/panelis/$speakerId`}
                    className="text-center mr-4"
                    title={speaker.name}
                  >
                    <img
                      src={speaker.cdnImageUrl}
                      alt={speaker.name}
                      className="max-w-full w-12 h-12 rounded-full"
                    />
                    <span className="text-sm">{getSpeakerName(speaker)}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {itHas(episode.description) && (
            <p className="text-lg">{episode.description}</p>
          )}
          {itHas(episode.content) && (
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: episode.content }}
            />
          )}
        </div>
      </article>
    </Container>
  )
}
