import { SITE_URL, X_HANDLE } from "./constants"
import getPhotonUrl from "./photon"

export const seo = ({
  title,
  description,
  keywords,
  image = getPhotonUrl({ src: `${SITE_URL}/assets/images/grunged-mockup.jpg` }),
}: {
  title: string
  description?: string
  image?: string
  keywords?: string
}) => {
  const tags = [
    { title },
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: `@${X_HANDLE}` },
    { name: 'twitter:site', content: `@${X_HANDLE}` },
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
    ...(image
      ? [
        { name: 'twitter:image', content: image },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'og:image', content: image },
      ]
      : []),
  ]

  return tags
}
