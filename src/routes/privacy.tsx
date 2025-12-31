import { createFileRoute } from '@tanstack/react-router'
import Container from '~/components/Container'
import Title from '~/components/Title'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/privacy')({
  component: Kontak,
  head: () => ({
    meta: seo({
      title: 'Tech Talk: Privacy Policy',
      description:
        'This is a privacy policy for Tech Talk, a podcast about technology in Creole.',
    }),
  }),
})

function Kontak() {
  return (
    <Container>
      <Title className="text-tt-blue">
        <span className="font-thin">Tech Talk:</span>
        <span className="font-medium">Privacy Policy</span>
      </Title>

      <div className="mb-8 bg-tt-yellow rounded-xl overflow-hidden shadow-lg">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-medium mb-2">Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              At Tech Talk, we take your privacy seriously. This policy outlines how we handle any information collected through our podcast and website.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-medium mb-2">Information Collection</h2>
            <p className="text-gray-700 mb-4">
              We collect minimal information necessary to operate our podcast and website. This may include:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Basic analytics data about website visits</li>
              <li>Email addresses if you choose to contact us</li>
              <li>Information you voluntarily provide when participating in our community projects</li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-medium mb-2">How We Use Information</h2>
            <p className="text-gray-700 mb-4">
              Any information we collect is used solely to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Improve our podcast content and educational materials</li>
              <li>Communicate with community members about projects and initiatives</li>
              <li>Enhance the user experience of our website</li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-medium mb-2">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about our privacy policy, please contact us at{' '}
              <a href="mailto:services@jgb.solutions" className="text-tt-blue hover:underline">
                services@jgb.solutions
              </a>
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}
