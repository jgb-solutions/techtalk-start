import { createFileRoute } from '@tanstack/react-router'

import Container from '~/components/Container'
import EpisodeCard from '~/components/EpisodeCard'
import SpeakerCardCompact from '~/components/SpeakerCardCompact'
import Title from '~/components/Title'
import * as api from '~/services/requests'
import { seo } from '~/utils/seo'


export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => {
    const [episodes, speakers] = await Promise.all([
      api.fetchEpisodes(),
      api.fetchSpeakers()
    ])

    return { episodes, speakers }
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
  const { episodes, speakers } = Route.useLoaderData()

  // Create infinite scroll by duplicating speakers
  const infiniteSpeakers = [...speakers, ...speakers, ...speakers]

  return (
    <Container>
      <Title className="text-tt-blue mb-8">
        <span className="font-thin">Tech Talk:</span>
        <span className="font-medium">An N Pale Teknoloji</span>
      </Title>

      {/* Episodes Section */}
      {episodes.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center mb-8">
            <div className="h-px bg-tt-blue flex-1"></div>
            <h2 className="px-4 text-2xl font-bold text-tt-blue">Epizòd yo</h2>
            <div className="h-px bg-tt-blue flex-1"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                episode={episode}
                className="transform hover:scale-105 transition-transform duration-200"
              />
            ))}
          </div>
        </div>
      )}

      {/* Speakers Section */}
      {speakers.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-8">
            <div className="h-px bg-tt-blue flex-1"></div>
            <h2 className="px-4 text-2xl font-bold text-tt-blue">Panelis yo</h2>
            <div className="h-px bg-tt-blue flex-1"></div>
          </div>

          {/* Horizontal Scrolling Speakers with Infinite Loop */}
          <div className="relative overflow-hidden">
            <div className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4 scroll-smooth touch-pan-x w-max animate-scroll">
              {infiniteSpeakers.map((speaker, index) => (
                <SpeakerCardCompact
                  key={`${speaker.id}-${index}`}
                  speaker={speaker}
                />
              ))}
            </div>

            {/* Scroll indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {speakers.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 bg-gray-300 rounded-full opacity-50"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {episodes.length === 0 && speakers.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Kontni pa disponib</h3>
            <p className="text-gray-500">
              Nou ap travay pou nou ka ajoute epizòd ak panelis yo pi vit ke posib.
            </p>
          </div>
        </div>
      )}
    </Container>
  )
}
