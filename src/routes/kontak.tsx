import { createFileRoute } from '@tanstack/react-router'
import { FaClock, FaEnvelope, FaHandshake, FaHeart, FaPodcast, FaUsers } from 'react-icons/fa'
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from 'react-icons/fa6'

import Container from '~/components/Container'
import Title from '~/components/Title'
import { seo } from '~/utils/seo'
import { SITE_FACEBOOK_URL, SITE_INSTAGRAM_URL, SITE_LINKEDIN_URL, SITE_X_URL, SITE_YOUTUBE_URL } from '~/utils/constants'

const EMAIL = 'services@jgb.solutions'

export const Route = createFileRoute('/kontak')({
  component: Kontak,
  head: () => ({
    meta: seo({
      title: 'Tech Talk: Kontak',
      description: 'Kontakte nou nan Tech Talk, yon pòdkas ki pale sou teknoloji an kreyòl. Ekri nou pa imèl oswa sou rezo sosyal yo.',
    }),
  }),
})

const SOCIALS = [
  { name: 'YouTube', icon: FaYoutube, url: SITE_YOUTUBE_URL, color: 'hover:text-red-600' },
  { name: 'Instagram', icon: FaInstagram, url: SITE_INSTAGRAM_URL, color: 'hover:text-pink-600' },
  { name: 'Facebook', icon: FaFacebook, url: SITE_FACEBOOK_URL, color: 'hover:text-blue-600' },
  { name: 'X / Twitter', icon: FaXTwitter, url: SITE_X_URL, color: 'hover:text-black' },
  { name: 'LinkedIn', icon: FaLinkedin, url: SITE_LINKEDIN_URL, color: 'hover:text-blue-700' },
]

/** What people write to us about, so they know where to start. */
const TOPICS = ['Kolaborasyon', 'Kesyon', 'Sijè pou yon epizòd', 'Konsèy', 'Vin panelis']

/** Contact by email or social media (no form: owner's choice, 2026-10-30). */
function Kontak() {
  return (
    <Container>
      <Title className="text-tt-blue mb-8">
        <span className="font-thin">Tech Talk:</span>
        <span className="font-medium">Kontak</span>
      </Title>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Email */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-tt-blue w-6 h-6 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Ekri Nou</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-5">
            Yon kesyon, yon lide pou yon epizòd, oswa ou vle kolabore ak nou? Voye yon imèl ba nou.
          </p>
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent('Tech Talk')}`}
            className="inline-flex items-center gap-2 rounded-lg bg-tt-blue px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <FaEnvelope className="w-4 h-4" />
            {EMAIL}
          </a>
          <p className="mt-4 flex items-center text-sm text-gray-600">
            <FaClock className="text-tt-blue w-4 h-4 mr-2" />
            N ap reponn nan 24-48 èdtan
          </p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Sa ou ka ekri nou pou li">
            {TOPICS.map((topic) => (
              <li key={topic} className="rounded-full bg-tt-yellow/15 px-3 py-1 text-sm font-medium text-gray-800">
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          {/* About */}
          <div className="bg-tt-yellow rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <FaPodcast className="text-tt-blue w-6 h-6 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Kiyès Nou Ye</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Tech Talk se yon pòdkas ki pale sou teknoloji nan lang kreyòl. Nou diskite sou dènye nouvèl teknoloji yo, konsèy pou
              pwogramasyon, ak eksperyans nou yo nan domèn teknoloji an. Nou vle ede kominote a konprann teknoloji pi byen.
            </p>
          </div>

          {/* Social media */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Swiv Nou, Ekri Nou</h2>
            <div className="grid grid-cols-2 gap-3">
              {SOCIALS.map(({ name, icon: Icon, url, color }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition ${color}`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Community */}
      <div className="bg-gradient-to-r from-tt-blue to-blue-700 rounded-2xl p-8 text-white shadow-lg mb-12">
        <div className="text-center mb-6">
          <FaHeart className="w-12 h-12 mx-auto mb-4 text-red-300" />
          <h2 className="text-3xl font-bold mb-2">Vin Jwenn Ak Kominote a</h2>
          <p className="text-blue-100 text-lg">
            Nou ap kreye yon kominote teknoloji ki pi solid nan peyi a. Patisipe nan diskisyon yo, pataje eksperyans ou, ak ede lòt moun nan
            chemen yo.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/10 rounded-xl p-4">
            <FaUsers className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Kominote</h3>
            <p className="text-sm text-blue-100">Vin rankontre ak lòt devlopè ak teknik yo</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <FaPodcast className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Kontni</h3>
            <p className="text-sm text-blue-100">Kontni yo ak dènye nouvèl teknoloji yo</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <FaHandshake className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Opòtinite</h3>
            <p className="text-sm text-blue-100">Opòtinite pou kolaborasyon ak pwomosyon</p>
          </div>
        </div>
      </div>
    </Container>
  )
}
