import { fetchEpisode, fetchEpisodes, fetchSpeaker, fetchSpeakers } from "~/services/requests"

export type IEpisode = NonNullable<Awaited<ReturnType<typeof fetchEpisode>>>
export type IEpisodeCard = NonNullable<Awaited<ReturnType<typeof fetchEpisodes>>>[0]
export type ISpeakerCard = NonNullable<Awaited<ReturnType<typeof fetchSpeakers>>>[0]
export type ISpeaker = NonNullable<Awaited<ReturnType<typeof fetchSpeaker>>>