export function FacebookComments({ url }: { url: string }) {
  return (
    <div className="rounded-lg overflow-hidden mt-8">
      <div className="fb-comments w-full [&.iframe]:w-full" data-lazy data-href={url} data-width="100%" data-numposts="5"></div>
      <div id="fb-root"></div>
      <script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/ht_HT/sdk.js#xfbml=1&version=v21.0&appId=1162365798565023">
      </script>
    </div>
  )
}