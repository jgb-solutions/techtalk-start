import { getFileUrl } from "~/utils/helpers.server"

import * as data from '~/data'

import getPhotonUrl from "~/utils/photon"
import { EPISODE_IMAGE_QUALITY, EPISODE_IMAGE_SIZE } from "~/utils/constants"

export function fetchEpisodes() {
  return data.episodes.map(({ image, collectionId, id, title }) => {
    const episodeImageUrl = getFileUrl({ field: image, collectionId, modelId: id })
    const episodeCdnImageUrl = getPhotonUrl({
      src: episodeImageUrl,
      quality: EPISODE_IMAGE_QUALITY,
      width: EPISODE_IMAGE_SIZE
    })

    return {
      imageUrl: episodeImageUrl,
      cdnImageUrl: episodeCdnImageUrl,
      title,
      id,
    }
  })
}


export async function fetchEpisode(episodeId: string) {
  const episode = data.episodes.find(e => e.id === episodeId)

  if (!episode) throw new Error("Episode not found!")

  const episodeImageUrl = getFileUrl({
    modelId: episode.id,
    field: episode.image,
    collectionId: episode.collectionId
  })

  const episodeCdnImageUrl = getPhotonUrl({ src: episodeImageUrl, quality: 100, width: 500 })

  return {
    imageUrl: episodeImageUrl,
    cdnImageUrl: episodeCdnImageUrl,
    speakers: data.speakers.filter(s => s.episodes.includes(episodeId)).map(({ image, id, collectionId, ...speaker }) => {
      const speakerImageUrl = getFileUrl({ modelId: id, field: image, collectionId })
      const speakerCdnImageUrl = getPhotonUrl({ src: speakerImageUrl, quality: 100, width: 48 })
      return {
        imageUrl: speakerImageUrl,
        cdnImageUrl: speakerCdnImageUrl,
        id,
        name: speaker.name
      }
    }),
    content: episode.content,
    youtube: episode.youtube,
    title: episode.title,
    spotify: episode.spotify,
    date: episode.date,
    description: episode.description
  }
}

export async function fetchSpeakers() {
  return data.speakers.map(({ image, id, collectionId, ...speaker }) => {
    const speakerImageUrl = getFileUrl({ modelId: id, field: image, collectionId })
    const speakerCdnImageUrl = getPhotonUrl({ src: speakerImageUrl, quality: 100, width: 200 })

    return {
      bio: '',
      imageUrl: speakerImageUrl,
      cdnImageUrl: speakerCdnImageUrl,
      name: speaker.name,
      id,
      youtube: speaker.youtube,
      facebook: speaker.facebook,
      instagram: speaker.instagram,
      linkedin: speaker.linkedin,
      x: speaker.x,
      website: speaker.website,
    }
  })
}

export async function fetchSpeaker(speakerId: string) {
  const speaker = data.speakers.find(s => s.id === speakerId)

  if (!speaker) throw new Error("Speaker not found")

  const speakerImageUrl = getFileUrl({ modelId: speaker.id, field: speaker.image, collectionId: speaker.collectionId })
  const speakerCdnImageUrl = getPhotonUrl({ src: speakerImageUrl, quality: 100, width: 200 })
  const speakerEpisodes = data.episodes.filter(e => e.speakers.includes(speaker.id))

  return {
    ...speaker,
    imageUrl: speakerImageUrl,
    cdnImageUrl: speakerCdnImageUrl,
    episodes: speakerEpisodes.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1).map(({ image, id, collectionId, ...episode }) => {
      const episodeImageUrl = getFileUrl({ modelId: id, field: image, collectionId })
      const episodeCdnImageUrl = getPhotonUrl({ src: episodeImageUrl, quality: 100, width: 250 })
      return {
        id,
        title: episode.title,
        imageUrl: episodeImageUrl,
        cdnImageUrl: episodeCdnImageUrl,
        description: episode.description,
      }
    })
  }

}