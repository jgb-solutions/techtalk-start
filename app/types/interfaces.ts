import { fetchEpisode, fetchEpisodes, fetchSpeaker, fetchSpeakers } from "~/services/requests"

export type IEpisode = NonNullable<Awaited<ReturnType<typeof fetchEpisode>>>
export type IEpisodeCard = NonNullable<Awaited<ReturnType<typeof fetchEpisodes>>>[0]
export type ISpeakerCard = NonNullable<Awaited<ReturnType<typeof fetchSpeakers>>>[0]
export type ISpeaker = NonNullable<Awaited<ReturnType<typeof fetchSpeaker>>>

export enum Collections {
  Authorigins = "_authOrigins",
  Externalauths = "_externalAuths",
  Mfas = "_mfas",
  Otps = "_otps",
  Superusers = "_superusers",
  Episodes = "episodes",
  Speakers = "speakers",
  Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString
  collectionId: string
  collectionName: Collections
  expand?: T
}

export type AuthSystemFields<T = never> = {
  email: string
  emailVisibility: boolean
  username: string
  verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
  collectionRef: string
  created?: IsoDateString
  fingerprint: string
  id: string
  recordRef: string
  updated?: IsoDateString
}

export type ExternalauthsRecord = {
  collectionRef: string
  created?: IsoDateString
  id: string
  provider: string
  providerId: string
  recordRef: string
  updated?: IsoDateString
}

export type MfasRecord = {
  collectionRef: string
  created?: IsoDateString
  id: string
  method: string
  recordRef: string
  updated?: IsoDateString
}

export type OtpsRecord = {
  collectionRef: string
  created?: IsoDateString
  id: string
  password: string
  recordRef: string
  sentTo?: string
  updated?: IsoDateString
}

export type SuperusersRecord = {
  created?: IsoDateString
  email: string
  emailVisibility?: boolean
  id: string
  password: string
  tokenKey: string
  updated?: IsoDateString
  verified?: boolean
}

export type EpisodesRecord = {
  content: HTMLString
  created?: IsoDateString
  date: IsoDateString
  description?: string
  id: string
  image: string
  speakers?: RecordIdString[]
  spotify: string
  title: string
  updated?: IsoDateString
  youtube: string
}

export type SpeakersRecord = {
  bio?: HTMLString
  created?: IsoDateString
  episodes?: RecordIdString[]
  facebook?: string
  id: string
  image?: string
  instagram?: string
  linkedin?: string
  name: string
  nickname?: string
  updated?: IsoDateString
  website?: string
  x?: string
  youtube?: string
}

export type UsersRecord = {
  avatar?: string
  created?: IsoDateString
  email: string
  emailVisibility?: boolean
  id: string
  name?: string
  password: string
  tokenKey: string
  updated?: IsoDateString
  verified?: boolean
}