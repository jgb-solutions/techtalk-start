import { IEpisode } from "~/types/interfaces"
import { clx, formatTitle } from "~/utils/helpers"

export default function Episode({
  episode,
  className,
}: {
  episode: IEpisode
  className?: string
}) {
  return (
    <div key={episode.id} className={clx("bg-tt-yellow rounded-xl overflow-hidden shadow-lg", className)}>
      <a
        className="sm:flex flex-row items-center"
        href={`/epizod/${episode.id}`}
      >
        <img src={episode.cdnImageUrl} alt={episode.title} className="sm:mr-2 sm:w-72" />
        <div className="flex-1 flex-col">
          <h3 className="text-2xl p-4 sm:p-0">
            <span className="font-thin">{formatTitle(episode.title)[0]}:</span><br />
            <span className="font-medium">{formatTitle(episode.title)[1]}</span>
          </h3>
          {/* <div className="flex flex-row items-center">
                  {episode.speakers.map((speaker) => (
                    <a key={speaker.id} href={`/panelis/${speaker.id}`} className="">
                      <img src={speaker.cdnImageUrl} alt={speaker.name} className="max-w-full w-8 h-8 rounded-full" />
                    </a>
                  ))}
                </div> */}
        </div>
      </a>
    </div>
  )
}