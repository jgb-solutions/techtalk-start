import { createFileRoute } from '@tanstack/react-router'
import Container from '~/components/Container'
import Speaker from '~/components/Speaker'
import Title from '~/components/Title'
import * as api from '~/services/requests'
import { clx } from '~/utils/helpers'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/panelis/')({
  component: Home,
  loader: async () => {
    const speakers = await api.fetchSpeakers()

    return { speakers }
  },
  head: () => {

    return {
      meta: [...seo({
        title: "Tech Talk: Panelis",
        description: `Paj tout panelis nan Tech Talk`,
      }),
      ]
    }
  },
})

function Home() {
  const { speakers } = Route.useLoaderData()

  return (
    <Container>
      <Title className="text-tt-blue mb-8">
        <span className="font-thin">Tech Talk:</span>
        <span className="font-medium">Panelis</span>
      </Title>

      <div className="mb-8">
        <div className="flex items-center mb-6">
          <div className="h-px bg-tt-blue flex-1"></div>
          <h2 className="px-4 text-xl font-semibold text-tt-blue">Tout Panelis yo</h2>
          <div className="h-px bg-tt-blue flex-1"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {speakers.map((speaker) => (
            <Speaker
              key={speaker.id}
              speaker={speaker}
              className={clx({
                'lg:col-span-1': true,
              })}
            />
          ))}
        </div>
      </div>
    </Container>
  )
}
