import { createFileRoute, Link, useLocation } from '@tanstack/react-router'
import { FaCalendarAlt, FaFacebookSquare, FaShare } from 'react-icons/fa'
import { FaEnvelope, FaLinkedin, FaTelegram, FaWhatsapp, FaXTwitter, FaUsers } from 'react-icons/fa6'
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
        image: episode.imageUrl,
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
      <Title className="text-tt-blue mb-8">
        <span className="font-thin">{formatTitle(episode.title)[0]}:</span>
        <br />
        <span className="font-medium">{formatTitle(episode.title)[1]}</span>
      </Title>

      {/* Main Content Grid - Responsive with better width utilization */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
        {/* Primary Content */}
        <div className="xl:col-span-3 space-y-6">
          {/* Media Section */}
          {(itHas(youtubeId) || itHas(episode.spotify)) && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {itHas(youtubeId) && (
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={episode.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {itHas(episode.spotify) && (
                <div className="p-4 sm:p-6">
                  <Spotify wide link={episode.spotify} />
                </div>
              )}
            </div>
          )}

          {/* Episode Content */}
          {itHas(episode.content) && (
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: episode.content }} />
              </div>
            </div>
          )}

          {/* Comments Section - Integrated into main content */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex-shrink-0 w-10 h-10 bg-tt-blue rounded-full flex items-center justify-center">
                <FaFacebookSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-lg">Vin nan Diskisyon an</p>
                <p className="text-sm text-gray-600">Pataje panse w yo sou epizòd sa a</p>
              </div>
            </div>
            <ClientOnly>
              <FacebookComments url={url} />
            </ClientOnly>
          </div>
        </div>

        {/* Sidebar - Responsive positioning */}
        <div className="xl:col-span-1 space-y-6">
          {/* Episode Info Card */}
          <div className="bg-tt-yellow rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="space-y-4">
              {/* Date */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <FaCalendarAlt className="w-5 h-5 text-tt-blue" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Dat Piblikasyon</p>
                  <p className="font-semibold text-sm lg:text-base">{formatDate(episode.date)}</p>
                </div>
              </div>

              {/* Speakers */}
              {itHas(episode.speakers.length) && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <FaUsers className="w-5 h-5 text-tt-blue" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Panelis</p>
                      <p className="font-semibold text-sm lg:text-base">{episode.speakers.length} {episode.speakers.length === 1 ? 'moun' : 'moun'}</p>
                    </div>
                  </div>

                  {/* Speaker Avatars - Stack on mobile, grid on larger screens */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {episode.speakers.map((speaker) => (
                      <Link
                        key={speaker.id}
                        params={{ speakerId: speaker.id }}
                        to={`/panelis/$speakerId`}
                        className="group text-center p-3 bg-white rounded-xl hover:shadow-md transition-all duration-200"
                        title={speaker.name}
                      >
                        <img
                          src={speaker.imageUrl}
                          alt={speaker.name}
                          className="w-14 h-14 lg:w-16 lg:h-16 rounded-full mx-auto mb-2 object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <p className="text-xs lg:text-sm font-medium text-gray-800 group-hover:text-tt-blue transition-colors">
                          {getSpeakerNickname(speaker)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Share Card */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center space-x-3 mb-4 lg:mb-6">
              <div className="flex-shrink-0 w-10 h-10 bg-tt-blue rounded-full flex items-center justify-center">
                <FaShare className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm lg:text-base">Pataje epizòd sa a</p>
                <p className="text-xs lg:text-sm text-gray-600">Ede lòt moun dekouvri nou </p>
              </div>
            </div>

            {/* Share Buttons Grid - Responsive */}
            <div className="grid grid-cols-2 gap-2 lg:gap-3">
              <FacebookShareButton
                url={url}
                title={title}
                hashtag={hashtags.split(' ').join(' #')}
                className="group"
              >
                <div className="flex items-center justify-center space-x-1 lg:space-x-2 p-2 lg:p-3 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
                  <FaFacebookSquare className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs lg:text-sm font-medium text-gray-700 group-hover:text-blue-600">Facebook</span>
                </div>
              </FacebookShareButton>

              <TwitterShareButton
                url={url}
                title={title}
                via={X_HANDLE}
                hashtags={hashtags.split(' ')}
                className="group"
              >
                <div className="flex items-center justify-center space-x-1 lg:space-x-2 p-2 lg:p-3 rounded-xl border-2 border-gray-200 hover:border-black hover:bg-gray-50 transition-all duration-200">
                  <FaXTwitter className="w-4 h-4 lg:w-5 lg:h-5 text-gray-800 group-hover:scale-110 transition-transform" />
                  <span className="text-xs lg:text-sm font-medium text-gray-700 group-hover:text-black">X/Twitter</span>
                </div>
              </TwitterShareButton>

              <LinkedinShareButton url={url} title={title} className="group">
                <div className="flex items-center justify-center space-x-1 lg:space-x-2 p-2 lg:p-3 rounded-xl border-2 border-gray-200 hover:border-blue-700 hover:bg-blue-50 transition-all duration-200">
                  <FaLinkedin className="w-4 h-4 lg:w-5 lg:h-5 text-blue-700 group-hover:scale-110 transition-transform" />
                  <span className="text-xs lg:text-sm font-medium text-gray-700 group-hover:text-blue-700">LinkedIn</span>
                </div>
              </LinkedinShareButton>

              <WhatsappShareButton url={url} title={title} className="group">
                <div className="flex items-center justify-center space-x-1 lg:space-x-2 p-2 lg:p-3 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all duration-200">
                  <FaWhatsapp className="w-4 h-4 lg:w-5 lg:h-5 text-green-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs lg:text-sm font-medium text-gray-700 group-hover:text-green-500">WhatsApp</span>
                </div>
              </WhatsappShareButton>

              <TelegramShareButton url={url} title={title} className="group">
                <div className="flex items-center justify-center space-x-1 lg:space-x-2 p-2 lg:p-3 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
                  <FaTelegram className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs lg:text-sm font-medium text-gray-700 group-hover:text-blue-500">Telegram</span>
                </div>
              </TelegramShareButton>

              <EmailShareButton url={url} subject={title} body={title} className="group">
                <div className="flex items-center justify-center space-x-1 lg:space-x-2 p-2 lg:p-3 rounded-xl border-2 border-gray-200 hover:border-gray-500 hover:bg-gray-50 transition-all duration-200">
                  <FaEnvelope className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs lg:text-sm font-medium text-gray-700 group-hover:text-gray-600">Imel</span>
                </div>
              </EmailShareButton>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
