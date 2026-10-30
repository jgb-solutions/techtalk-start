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

  const [latest, ...rest] = episodes

  return (
    <>
      {/* Hero: black like the header, the show's promise, where to listen, the latest episode. */}
      <section className="bg-black text-white">
        <Container className="grid items-center gap-10 pb-14 pt-6 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-tt-yellow">
              <span className="size-2 rounded-full bg-tt-yellow" aria-hidden="true" />
              Pòdkas teknoloji an kreyòl
            </p>
            <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
              <span className="block font-thin">Tech Talk:</span>
              <span className="block text-tt-yellow">An n Pale Teknoloji</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/75">
              Chak epizòd, panelis yo pale sou sa k ap pase nan teknoloji, entènèt ak biznis dijital, an kreyòl ayisyen.
            </p>
            <p className="mt-8 mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Koute sou</p>
            <PodcastPlatform className="grid grid-cols-2 gap-2 sm:grid-cols-3" />
          </div>
          {latest && (
            <div className="w-full max-w-md justify-self-center lg:justify-self-end">
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

          {/* A slow, smooth loop: the list twice, moved left by exactly one copy (GPU transform),
              fading at the edges; it pauses on hover or focus, and stands still for
              reduced-motion visitors, who can swipe it instead. */}
          <div className="speakers-marquee group relative -mx-4 overflow-hidden px-4 sm:mx-0 sm:px-0">
            <div className="speakers-track flex w-max" style={{ animationDuration: `${speakers.length * 6}s` }}>
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex shrink-0" aria-hidden={copy === 1 ? true : undefined} inert={copy === 1}>
                  {speakers.map((speaker) => (
                    <li key={speaker.id} className="pr-4">
                      <SpeakerCardCompact speaker={speaker} />
                    </li>
                  ))}
                </ul>
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
