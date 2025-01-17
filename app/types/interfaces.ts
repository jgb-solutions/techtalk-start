import { fetchEpisode, fetchSpeaker } from "~/services/requests"

export type IEpisode = NonNullable<Awaited<ReturnType<typeof fetchEpisode>>>
export type ISpeaker = NonNullable<Awaited<ReturnType<typeof fetchSpeaker>>>