import { createFileRoute } from '@tanstack/react-router'
import Container from '~/components/Container'
import EpisodeCard from '~/components/EpisodeCard'
import * as api from '~/services/requests'
import { removeHtmlTags, getSpeakerNickname } from '~/utils/helpers'
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
        image: speaker.imageUrl,
      }),
      ]
    }
  },
})

function RouteComponent() {
  const { speaker } = Route.useLoaderData()

  return (
    <Container>
      {/* Speaker Profile Section */}
      <div className="mb-12">
        <Speaker speaker={speaker} className="" />
      </div>

      {/* Episodes Section */}
      {speaker.episodes.length > 0 && (
        <div>
          <div className="flex items-center mb-8">
            <div className="h-px bg-tt-blue flex-1"></div>
            <h2 className="px-4 text-2xl font-bold text-tt-blue">Epizòd yo</h2>
            <div className="h-px bg-tt-blue flex-1"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {speaker.episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                episode={episode}
                className="transform hover:scale-105 transition-transform duration-200"
              />
            ))}
          </div>
        </div>
      )}

      {/* No Episodes Message */}
      {speaker.episodes.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Pa gen epizòd yo</h3>
            <p className="text-gray-500">
              {getSpeakerNickname(speaker)} pa gen okenn epizòd ki gen rapò ak li ankò.
            </p>
          </div>
        </div>
      )}
    </Container>
  )
}
