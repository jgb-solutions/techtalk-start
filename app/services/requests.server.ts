// import * as C from "~/utils/constants"
import { pickFields, getModelUrl } from "~/utils/helpers.server"

import type * as PT from '../types/pocketbase-types'
import { pb } from './pocketbase.server'
import getPhotonUrl from "~/utils/photon"

export async function fetchSiteMap() {
  return Promise.all([
    pb.collection('episodes').getFullList<{
      id: string
      created: string
      updated: string
    }>({
      fields: pickFields(['id', 'created', 'updated']),
      sort: '-updated',
      skipTotal: true
    }),
    pb.collection('speakers').getFullList<{
      id: string
      created: string
      updated: string
    }>({
      fields: pickFields(['id', 'created', 'updated']),
      sort: '-updated',
      skipTotal: true
    }),
  ])
}

export async function fetchEpisodes() {
  const response = await pb.collection('episodes').getFullList<
    PT.EpisodesResponse & {
      expand: {
        speakers: PT.SpeakersResponse<{ T: object }>[]
      }
    }
  >({
    // expand: 'speakers',
    sort: '-date'
  })

  return response.map(({ image, ...episode }) => {
    const episodeImageUrl = getModelUrl({ model: episode, field: image })
    const episodeCdnImageUrl = getPhotonUrl({ src: episodeImageUrl, quality: 100, width: 720 })

    return {
      ...episode,
      imageUrl: episodeImageUrl,
      cdnImageUrl: episodeCdnImageUrl,
      speakers: []
    }
  })
}


export async function fetchEpisode(episodeId: string) {
  const response = await pb.collection('episodes').getOne<
    PT.EpisodesResponse & {
      expand: {
        speakers: PT.SpeakersResponse<{ T: object }>[]
      }
    }
  >(episodeId, {
    expand: 'speakers',
    sort: '-date'
  })

  const { image, expand, ...episode } = response

  const episodeImageUrl = getModelUrl({ model: episode, field: image })
  const episodeCdnImageUrl = getPhotonUrl({ src: episodeImageUrl, quality: 100, width: 720 })

  return {
    ...episode,
    imageUrl: episodeImageUrl,
    cdnImageUrl: episodeCdnImageUrl,
    speakers: expand.speakers.filter(s => s.image).map(({ image, ...speaker }) => {
      const speakerImageUrl = getModelUrl({ model: speaker, field: image })
      const speakerCdnImageUrl = getPhotonUrl({ src: speakerImageUrl, quality: 100, width: 250 })
      return {
        ...speaker,
        imageUrl: speakerImageUrl,
        cdnImageUrl: speakerCdnImageUrl
      }
    })
  }

}

export async function fetchSpeakers() {
  const response = await pb.collection('speakers').getFullList<
    PT.SpeakersResponse & {
      expand: {
        episodes_via_speakers: PT.EpisodesResponse<{ T: object }>[]
      }
    }
  >({
    expand: 'episodes_via_speakers',
    sort: '-created'
  })

  return response.filter(s => s.image).map(({ image, expand, ...speaker }) => {
    const speakerImageUrl = getModelUrl({ model: speaker, field: image })
    const speakerCdnImageUrl = getPhotonUrl({ src: speakerImageUrl, quality: 100, width: 250 })

    return {
      ...speaker,
      imageUrl: speakerImageUrl,
      cdnImageUrl: speakerCdnImageUrl,
      episodes: expand.episodes_via_speakers.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1).map(({ image, ...episode }) => {
        const episodeImageUrl = getModelUrl({ model: episode, field: image })
        const episodeCdnImageUrl = getPhotonUrl({ src: episodeImageUrl, quality: 100, width: 250 })
        return {
          ...episode,
          imageUrl: episodeImageUrl,
          cdnImageUrl: episodeCdnImageUrl
        }
      })
    }
  })
}

export async function fetchSpeaker(speakerId: string) {
  const response = await pb.collection('speakers').getOne<
    PT.SpeakersResponse & {
      expand: {
        episodes_via_speakers: PT.EpisodesResponse<{ T: object }>[]
      }
    }
  >(speakerId, {
    expand: 'episodes_via_speakers',
    sort: '-date'
  })

  const { image, expand, ...speaker } = response

  const speakerImageUrl = getModelUrl({ model: speaker, field: image })
  const speakerCdnImageUrl = getPhotonUrl({ src: speakerImageUrl, quality: 100, width: 720 })

  return {
    ...speaker,
    imageUrl: speakerImageUrl,
    cdnImageUrl: speakerCdnImageUrl,
    episodes: expand.episodes_via_speakers.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1).map(({ image, ...episode }) => {
      const episodeImageUrl = getModelUrl({ model: episode, field: image })
      const episodeCdnImageUrl = getPhotonUrl({ src: episodeImageUrl, quality: 100, width: 720 })
      return {
        ...episode,
        imageUrl: episodeImageUrl,
        cdnImageUrl: episodeCdnImageUrl
      }
    })
  }

}