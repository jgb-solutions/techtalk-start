import { Link } from "@tanstack/react-router"
import { IEpisodeCard } from "~/types/interfaces"
import { clx, formatTitle } from "~/utils/helpers"

/** An episode: its picture, the episode number ("Tech Talk S01E09") as a badge, then the title. */
export default function EpisodeCard({
  episode,
  className,
  featured = false,
}: {
  episode: IEpisodeCard
  className?: string
  featured?: boolean
}) {
  const [label, title] = formatTitle(episode.title)
  return (
    <Link
      to="/epizod/$episodeId"
      params={{ episodeId: episode.id }}
      className={clx(
        "group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tt-yellow",
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        <img
          src={episode.imageUrl}
          alt=""
          loading={featured ? "eager" : "lazy"}
          className="size-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-tt-yellow px-3 py-1 text-xs font-bold uppercase tracking-wide text-black shadow">
          {title ? label.replace(/^Tech Talk\s*/i, "") || "Tech Talk" : "Tech Talk"}
        </span>
      </div>
      <h3 className={clx("p-4 font-semibold leading-snug text-gray-900 group-hover:text-tt-blue", featured ? "text-2xl sm:text-3xl" : "text-lg")}>
        {title ?? label}
      </h3>
    </Link>
  )
}
