import { fetchEpisode } from "~/services/requests.server"

export type IEpisode = NonNullable<Awaited<ReturnType<typeof fetchEpisode>>>