import { createFileRoute, Link, useLocation } from '@tanstack/react-router'
import { FaCalendarAlt, FaFacebookSquare, FaShare } from 'react-icons/fa'
import { FaEnvelope, FaLinkedin, FaTelegram, FaWhatsapp, FaXTwitter } from 'react-icons/fa6'
import {
  EmailShareButton,
  TwitterShareButton,
  TelegramShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton
} from 'react-share'
import ClientOnly from '~/components/ClientOnly'

import Container from '~/components/Container'
import { FacebookComments } from '~/components/FacebookComments'
import { Spotify } from '~/components/Spotify'
import Title from '~/components/Title'
import * as api from '~/services/requests'
import { SITE_NAME, SITE_URL, X_HANDLE } from '~/utils/constants'
import {
  formatDate,
  formatTitle,
  getSpeakerNickname,
  getYouTubeIdFromUrl,
  itHas,
  removeHtmlTags,
} from '~/utils/helpers'
import { seo } from '~/utils/seo'


export const Route = createFileRoute('/epizod/$episodeId')({
  component: EpisodePage,
  loader: async ({ params: { episodeId } }) => {
    const episode = await api.fetchEpisode(episodeId)

    return { episode }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}

    const { episode } = loaderData

    return {
      meta: [...seo({
        title: episode.title,
        description: episode.description || removeHtmlTags(episode.content),
        image: episode.cdnImageUrl,
      }),
      ]
    }
  },
})

function EpisodePage() {
  const location = useLocation()
  const { episode } = Route.useLoaderData()
  const youtubeId = getYouTubeIdFromUrl(episode.youtube)
  const url = `${SITE_URL}${location.href}`
  const title = `Tande  ${episode.title} sou ${SITE_NAME}`
  const hashtags = `${SITE_NAME} techtalk episode share tech talk podcast`

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

        {itHas(episode.spotify) && (
          <div className="mb-4 p-4">
            <Spotify wide link={episode.spotify} />
          </div>
        )}

        <div className="p-4">
          <div className="flex flex-row items-center mb-8">
            <div className="flex flex-row items-center">
              <FaCalendarAlt className="w-8 h-8 mr-1" />
              <span className="font-medium">{formatDate(episode.date)}</span>
            </div>
          </div>

          {itHas(episode.speakers.length) && (
            <div className="flex flex-row items-center mb-4">
              <div className="flex flex-row items-center flex-wrap">
                {episode.speakers.map((speaker) => (
                  <Link
                    key={speaker.id}
                    params={{ speakerId: speaker.id }}
                    to={`/panelis/$speakerId`}
                    className="text-center mr-2 sm:mr-4 mb-2 sm:mb-4"
                    title={speaker.name}
                  >
                    <img
                      src={speaker.cdnImageUrl}
                      alt={speaker.name}
                      className="max-w-full w-12 h-12 rounded-full"
                    />
                    <span className="text-sm">{getSpeakerNickname(speaker)}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {itHas(episode.content) && (
            <div
              className="prose mb-8"
              dangerouslySetInnerHTML={{ __html: episode.content }}
            />
          )}

          <div className="flex items-center">

            <FaShare
              className={`w-6 h-6 rounded-xl mr-2 `}
            />

            <FacebookShareButton
              url={url}
              title={title}
              hashtag={hashtags.split(' ').join(' #')}
            >
              <FaFacebookSquare
                className={`w-10 h-10 rounded-xl mr-2 `}
              />
            </FacebookShareButton>

            <TwitterShareButton
              url={url}
              title={title}
              via={X_HANDLE}
              hashtags={hashtags.split(' ')}
            >
              <FaXTwitter
                className={`w-10 h-10 rounded-xl mr-2`}
              />
            </TwitterShareButton>
            <LinkedinShareButton url={url} title={title}>
              <FaLinkedin
                className={`w-10 h-10 rounded-xl mr-2`}
              />
            </LinkedinShareButton>
            <WhatsappShareButton url={url} title={title}>
              <FaWhatsapp
                className={`w-10 h-10 rounded-xl mr-2`}
              />
            </WhatsappShareButton>
            <TelegramShareButton url={url} title={title}>
              <FaTelegram
                className={`w-10 h-10 rounded-xl mr-2`}
              />
            </TelegramShareButton>
            <EmailShareButton url={url} subject={title} body={title}>
              <FaEnvelope
                className={`w-10 h-10 rounded-xl`}
              />
            </EmailShareButton>
          </div>
        </div>
      </article>

      <ClientOnly>
        <FacebookComments url={url} />
      </ClientOnly>
    </Container>
  )
}
