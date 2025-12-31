import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { FaEnvelope, FaClock, FaUsers, FaPodcast, FaHandshake, FaHeart } from 'react-icons/fa'
import { FaYoutube, FaInstagram, FaFacebook, FaXTwitter, FaLinkedin, FaTelegram } from 'react-icons/fa6'

import Container from '~/components/Container'
import Title from '~/components/Title'
import { seo } from '~/utils/seo'
import {
  SITE_YOUTUBE_URL,
  SITE_INSTAGRAM_URL,
  SITE_FACEBOOK_URL,
  SITE_X_URL,
  SITE_LINKEDIN_URL
} from '~/utils/constants'
import { contactSchema,
  sendContactEmail } from '~/server/contact'

type ContactForm = z.infer<typeof contactSchema>

export const Route = createFileRoute('/kontak')({
  component: Kontak,
  head: () => ({
    meta: seo({
      title: 'Tech Talk: Kontak',
      description: 'Kontakte nou nan Tech Talk, yon pòdkas ki pale sou teknoloji an kreyòl. Di nou sa ou panse, bay nou konsèy, oswa kolabore ak nou.',
    }),
  }),
})

function Kontak() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [generalError, setGeneralError] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    // Clear general error when user starts typing
    if (generalError) {
      setGeneralError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form data locally first
      contactSchema.parse(formData)

      // Use the server-side function
      const result = await sendContactEmail({ data: formData })

      if (!result.success) {
        // Handle server function errors
        if (result.errors) {
          setErrors(result.errors)
          setGeneralError('')
        } else {
          setErrors({})
          setGeneralError(result.message)
        }
        return
      }

      // Success - show success message
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setErrors({})
      setGeneralError('')

    } catch (error) {
      console.error('Form submission error:', error)
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.issues.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        // Handle network or other errors
        setErrors({})
        setGeneralError(error instanceof Error ? error.message : 'Gen yon erè ki pa previ. Tanpri eseye ankò.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const shareOptions = [
    { name: 'YouTube', icon: FaYoutube, url: SITE_YOUTUBE_URL, color: 'hover:text-red-600' },
    { name: 'Instagram', icon: FaInstagram, url: SITE_INSTAGRAM_URL, color: 'hover:text-pink-600' },
    { name: 'Facebook', icon: FaFacebook, url: SITE_FACEBOOK_URL, color: 'hover:text-blue-600' },
    { name: 'X / Twitter', icon: FaXTwitter, url: SITE_X_URL, color: 'hover:text-black' },
    { name: 'LinkedIn', icon: FaLinkedin, url: SITE_LINKEDIN_URL, color: 'hover:text-blue-700' },
  ]

  return (
    <Container>
      <Title className="text-tt-blue mb-8">
        <span className="font-thin">Tech Talk:</span>
        <span className="font-medium">Kontak</span>
      </Title>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center mb-6">
            <FaEnvelope className="text-tt-blue w-6 h-6 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Kontakte Nou</h2>
          </div>

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-4">
                <FaHandshake className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">Mesaj ou voye ak siksè!</p>
                <p className="text-sm">N ap reponn ou pi vit ke nou kapab.</p>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-tt-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Voye Yon Lòt Mesaj
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Non ou *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tt-blue ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Antre non ou"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Imel ou *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tt-blue ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="exemple@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Sijè a *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tt-blue ${errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                >
                  <option value="">Chwazi yon sijè</option>
                  <option value="kolaborasyon">Kolaborasyon</option>
                  <option value="kesyon">Kesyon</option>
                  <option value="sijè-epizod">Sijè pou Epizòd</option>
                  <option value="konsèy">Konsèy</option>
                  <option value="lòt">Lòt bagay</option>
                </select>
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mesaj ou *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tt-blue resize-none ${errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Ki mesaj ou ta renmen voye nou?"
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-tt-blue text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Ap voye mesaj la...
                  </>
                ) : (
                  <>
                    <FaTelegram className="w-4 h-4 mr-2" />
                    Voye Mesaj la
                  </>
                )}
              </button>

              {/* General Error Message - Displayed below form */}
              {generalError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mt-4">
                  <p className="text-sm">{generalError}</p>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* About Section */}
          <div className="bg-tt-yellow rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <FaPodcast className="text-tt-blue w-6 h-6 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Kiyès Nou Ye</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Tech Talk se yon pòdkas ki pale sou teknoloji nan lang kreyòl. Nou diskite sou dènye nouvèl teknoloji yo,
              konsèy pou pwogramasyon, ak eksperyans nou yo nan domèn teknoloji an. Nou vle ede kominote a konprann teknoloji pi byen.
            </p>
          </div>

          {/* Quick Contact */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Kontakte Rapide</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaEnvelope className="text-tt-blue w-5 h-5 mr-3" />
                <a href="mailto:services@jgb.solutions" className="text-gray-700 hover:text-tt-blue transition">
                  services@jgb.solutions
                </a>
              </div>
              <div className="flex items-center">
                <FaClock className="text-tt-blue w-5 h-5 mr-3" />
                <span className="text-gray-700">N ap reponn nan 24-48 èdtan</span>
              </div>
              <div className="flex items-center">
                <FaUsers className="text-tt-blue w-5 h-5 mr-3" />
                <span className="text-gray-700">Kominote teknoloji Ayiti</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Swiv Nou</h3>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => {
                const IconComponent = option.icon
                return (
                  <a
                    key={option.name}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition ${option.color}`}
                  >
                    <IconComponent className="w-5 h-5 mr-3" />
                    <span className="font-medium">{option.name}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="bg-gradient-to-r from-tt-blue to-blue-700 rounded-2xl p-8 text-white shadow-lg">
        <div className="text-center mb-6">
          <FaHeart className="w-12 h-12 mx-auto mb-4 text-red-300" />
          <h2 className="text-3xl font-bold mb-2">Vin Jwenn Ak Kominote a</h2>
          <p className="text-blue-100 text-lg">
            Nou ap kreye yon kominote teknoloji ki pi solid nan peyi a.
            Patisipe nan diskisyon yo, pataje eksperyans ou, ak ede lòt moun nan chemen yo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/10 rounded-xl p-4">
            <FaUsers className="w-8 h-8 mx-auto mb-2" />
            <h4 className="font-semibold mb-1">Kominote</h4>
            <p className="text-sm text-blue-100">Vin rankontre ak lòt devlopè ak teknik yo</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <FaPodcast className="w-8 h-8 mx-auto mb-2" />
            <h4 className="font-semibold mb-1">Kontni</h4>
            <p className="text-sm text-blue-100">Kontni yo ak dènye nouvèl teknoloji yo</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <FaHandshake className="w-8 h-8 mx-auto mb-2" />
            <h4 className="font-semibold mb-1">Oppòtinite</h4>
            <p className="text-sm text-blue-100">Oppòtinite pou kolaborasyon ak pwomosyon</p>
          </div>
        </div>
      </div>
    </Container>
  )
}
