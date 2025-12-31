import { FacebookProvider, Comments } from 'react-facebook'
import { FACEBOOK_APP_ID } from '~/utils/constants'

export function FacebookComments({ url }: { url: string }) {
  return (
    <div className="rounded-lg overflow-hidden mt-8">
      <FacebookProvider appId={FACEBOOK_APP_ID} language='ht_HT'>
        <Comments colorScheme='dark' href={url} lazy mobile />
      </FacebookProvider>
    </div>
  )
}