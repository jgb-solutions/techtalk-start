import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import Container from '~/components/Container'
import Episode from '~/components/Episode'
import * as api from '~/services/requests.server'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaGlobe } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6"
import { clx } from '~/utils/helpers'

const getSpeaker = createServerFn({
  method: 'GET',
}).validator((data: string) => data).handler(async ctx => {
  const episode = await api.fetchSpeaker(ctx.data)

  return episode
})


export const Route = createFileRoute('/panelis/$speakerId')({
  component: RouteComponent,
  loader: async ({ params: { speakerId } }) => {
    const speaker = await getSpeaker({ data: speakerId })

    return { speaker }
  },
})

function RouteComponent() {
  const { speaker } = Route.useLoaderData()

  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        <div className="bg-tt-yellow rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-8 flex flex-col md:flex-row items-center gap-8">
            <img
              src={speaker.cdnImageUrl}
              alt={speaker.name}
              className="w-48 h-48 rounded-full shadow-lg border-4 border-white"
            />
            <div>
              <h1 className="text-4xl font-bold mb-4">{speaker.name}</h1>
              {speaker.bio && (
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: speaker.bio }} />
              )}

              <div className="flex gap-4 mt-4">
                {speaker.youtube && (
                  <a
                    href={speaker.youtube}
                    className="text-black hover:text-black/80 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube className="w-6 h-6" />
                  </a>
                )}

                {speaker.instagram && (
                  <a
                    href={speaker.instagram}
                    className="text-black hover:text-black/80 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </a>
                )}

                {speaker.facebook && (
                  <a
                    href={speaker.facebook}
                    className="text-black hover:text-black/80 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="w-6 h-6" />
                  </a>
                )}

                {speaker.x && (
                  <a
                    href={speaker.x}
                    className="text-black hover:text-black/80 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaXTwitter className="w-6 h-6" />
                  </a>
                )}

                {speaker.linkedin && (
                  <a
                    href={speaker.linkedin}
                    className="text-black hover:text-black/80 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                )}

                {speaker.website && (
                  <a
                    href={speaker.website}
                    className="text-black hover:text-black/80 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGlobe className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {speaker.episodes.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-tt-blue">Epizòd</h2>
            <div className="mb-12">
              {speaker.episodes.map((episode, index) => (
                <Episode key={episode.id} episode={episode}
                  className={clx({
                    'mb-4': index !== speaker.episodes.length - 1,
                  })}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  )


}
