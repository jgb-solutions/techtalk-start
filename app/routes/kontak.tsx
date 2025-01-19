import { createFileRoute } from '@tanstack/react-router'
import Container from '~/components/Container'
import Socials from '~/components/Socials'
import Title from '~/components/Title'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/kontak')({
  component: Kontak,
  head: () => ({
    meta: seo({
      title: 'Tech Talk: Kontak',
      description: 'Kontakte nou nan Tech Talk, yon pòdkas ki pale sou teknoloji an kreyòl.',
    }),
  }),
})

function Kontak() {
  return (
    <Container>
      <Title className="text-tt-blue">
        <span className="font-thin">Tech Talk:</span>
        <span className="font-medium">Kontak</span>
      </Title>

      <div className="mb-8 bg-tt-yellow rounded-xl overflow-hidden shadow-lg">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-medium mb-2">Kiyès Nou Ye</h2>
            <p className="text-gray-700">
              Tech Talk se yon pòdkas ki pale sou teknoloji an kreyòl. Nou diskite sou dènye nouvèl teknoloji yo,
              konsèy pwogramasyon, ak eksperyans nou nan domèn teknoloji a.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-medium mb-2">Kontakte Nou</h2>
            <p className="text-gray-700">
              Ou ka kontakte nou pa imel: <a href="mailto:services@jgb.solutions" className="text-tt-blue hover:underline">services@jgb.solutions</a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-2">Suiv Nou</h2>
            <Socials />
          </div>
        </div>
      </div>
    </Container>
  )
}
