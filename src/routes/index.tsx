import { createFileRoute } from '@tanstack/react-router'

import Container from '~/components/Container'
import EpisodeCard from '~/components/EpisodeCard'
import SpeakerCardCompact from '~/components/SpeakerCardCompact'
import PodcastPlatform from '~/components/PodcastPlatform'
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

  const [latest, ...rest] = episodes

  return (
    <>
      {/* Hero: black like the header, the show's promise, where to listen, the latest episode. */}
      <section className="bg-black text-white">
        <Container className="grid items-center gap-10 pb-14 pt-6 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-tt-yellow">
              <span className="size-2 rounded-full bg-tt-yellow" aria-hidden="true" />
              Pòdkas teknoloji an kreyòl
            </p>
            <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
              <span className="font-thin">Tech Talk:</span>{" "}
              <span className="text-tt-yellow">An N Pale Teknoloji</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/75">
              Chak epizòd, panelis yo pale sou sa k ap pase nan teknoloji, entènèt ak biznis dijital, an kreyòl ayisyen.
            </p>
            <p className="mt-8 mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Koute sou</p>
            <PodcastPlatform />
          </div>
          {latest && (
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Dènye epizòd</p>
              <EpisodeCard episode={latest} featured />
            </div>
          )}
        </Container>
      </section>

      <Container>
      {/* Episodes Section */}
      {rest.length > 0 && (
        <section className="mt-10 mb-14" aria-labelledby="episodes-heading">
          <SectionHeading id="episodes-heading">Epizòd yo</SectionHeading>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </section>
      )}

      {/* Speakers Section */}
      {speakers.length > 0 && (
        <section className="mb-12" aria-labelledby="speakers-heading">
          <SectionHeading id="speakers-heading">Panelis yo</SectionHeading>

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

          </div>
        </section>
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
    </>
  )
}

/** A section title between two thin blue lines, as on the original design. */
function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <div className="h-px flex-1 bg-tt-blue/40" />
      <h2 id={id} className="text-2xl font-bold text-tt-blue sm:text-3xl">
        {children}
      </h2>
      <div className="h-px flex-1 bg-tt-blue/40" />
    </div>
  )
}
