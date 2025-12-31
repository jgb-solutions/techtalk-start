import { createFileRoute } from '@tanstack/react-router'
import Container from '~/components/Container'
import Title from '~/components/Title'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/privacy')({
  component: Kontak,
  head: () => ({
    meta: seo({
      title: 'Tech Talk: Politik Konfidansyalite',
      description:
        'Sa a se yon politik konfidansyalite pou Tech Talk, yon pòdkas sou teknoloji nan kreyòl.',
    }),
  }),
})

function Kontak() {
  return (
    <Container>
      <Title className="text-tt-blue mb-8">
        <span className="font-thin">Tech Talk:</span>
        <span className="font-medium">Politik Konfidansyalite</span>
      </Title>

      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-tt-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Politik Konfidansyalite</h1>
            <p className="text-gray-600">Dènye aktyalizasyon: Desanm 31, 2025</p>
          </div>
        </div>

        {/* Content Cards */}
        <div className="space-y-6">
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-tt-blue rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Entwodiksyon</h2>
            </div>
            <p className="text-gray-700 leading-relaxed ml-11">
              Nan Tech Talk, nou pran konfidansyalite w yo se yon bagay serye. Politik sa a eksplike ki jan nou trete nenpòt enfòmasyon yo kolekte nan pòdkas nou an ak sit entènèt la. Nou ap angaje nou pou pwoteje enfòmasyon pèsonèl w yo epi nou vle yo te transparan sou pratik done nou yo.
            </p>
          </div>

          {/* Information Collection */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-tt-blue rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Enfòmasyon nou Kolekte</h2>
            </div>
            <div className="ml-11">
              <p className="text-gray-700 mb-4">
                Nou kolekte yon ti kantite enfòmasyon ki nesesè pou fè pòdkas nou an ak sit entènèt la mache. Sa a ka gen ladan l:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-tt-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Donn analitik debaz sou visit yo nan sit entènèt la ak entèraksyon itilizatè yo</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-tt-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Adrès imèl si w chwazi pou nou kontakte nou nan fòm nou yo</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-tt-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Enfòmasyon w yo bay volontèman lè w patisipe nan pwojè kominote nou yo</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-tt-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Kòmante ak fidbak w yo pataje ak nou</span>
                </li>
              </ul>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-tt-blue rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Ki Jan Nou Itilize Enfòmasyon W yo</h2>
            </div>
            <div className="ml-11">
              <p className="text-gray-700 mb-4">
                Nenpòt enfòmasyon nou kolekte yo itilize sèlman pou:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-tt-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Amelyore kontni pòdkas nou an ak materyèl edikatif nou yo</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-tt-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Kominike ak manm kominote a sou pwojè ak pwogram yo</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-tt-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Amelyore eksperyans itilizatè a nan sit entènèt nou an</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-tt-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Reponn kesyon ak fidbak w yo</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Data Protection */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-tt-blue rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">4</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Pwoteksyon Done</h2>
            </div>
            <div className="ml-11">
              <p className="text-gray-700 leading-relaxed">
                Nou aplike mezi sekirite ki apwopriye pou pwoteje enfòmasyon pèsonèl w yo kont aksè san otorizasyon, altèrasyon, divilgasyon, oswa destriksyon. Sepandan, pa gen okenn metòd transmisyon sou entènèt la ki 100% sekirite, epi nou pa ka garanti sekirite absoli.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-tt-yellow rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-tt-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Kontakte Nou</h2>
            </div>
            <div className="ml-11">
              <p className="text-gray-700 mb-4">
                Si w gen nenpòt kesyon sou politik konfidansyalite nou an, tanpri pa ezite pou nou kontakte:
              </p>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-tt-blue mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:services@jgb.solutions" className="text-tt-blue hover:underline font-medium">
                    services@jgb.solutions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
