import { pickFields, getModelUrl } from "~/utils/helpers.server"

import type * as PT from '~/types/pocketbase-types'
import { pb } from './pocketbase'
import getPhotonUrl from "~/utils/photon"
import { EPISODE_IMAGE_QUALITY, EPISODE_IMAGE_SIZE } from "~/utils/constants"

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
    Pick<PT.EpisodesResponse<{ T: never }>, 'id' | 'title' | 'image' | 'collectionId' | 'collectionName'>
  >({
    sort: '-date',
    fields: pickFields(['id', 'title', 'image', 'collectionId', 'collectionName'])
  })

  return response.map(({ image, ...episode }) => {
    const episodeImageUrl = getModelUrl({ model: episode, field: image })
    const episodeCdnImageUrl = getPhotonUrl({
      src: episodeImageUrl,
      quality: EPISODE_IMAGE_QUALITY,
      width: EPISODE_IMAGE_SIZE
    })

    return {
      ...episode,
      imageUrl: episodeImageUrl,
      cdnImageUrl: episodeCdnImageUrl,
    }
  })
}


export async function fetchEpisode(episodeId: string) {
  const response = await pb.collection('episodes').getOne<
    PT.EpisodesResponse & {
      expand: {
        speakers: PT.SpeakersResponse[]
      }
    }
  >(episodeId, {
    expand: 'speakers',
    sort: '-date'
  })

  const { image, expand, ...episode } = response

  // const episodeImageUrl = getModelUrl({ model: episode, field: image })
  // const episodeCdnImageUrl = getPhotonUrl({ src: episodeImageUrl, quality: 100, width: 500 })

  return {
    ...episode,
    imageUrl: '', // image won't be used on the episode detail page. So avoid computing the CDN link.
    cdnImageUrl: '', // image won't be used on the episode detail page. So avoid computing the CDN link.
    speakers: expand.speakers.filter(s => s.image).map(({ image, expand, ...speaker }) => {
      const speakerImageUrl = getModelUrl({ model: speaker, field: image })
      const speakerCdnImageUrl = getPhotonUrl({ src: speakerImageUrl, quality: 100, width: 48 })
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

  return response.filter(s => s.image).map(({ image, bio, expand, ...speaker }) => {
    const speakerImageUrl = getModelUrl({ model: speaker, field: image })
    const speakerCdnImageUrl = getPhotonUrl({ src: speakerImageUrl, quality: 100, width: 200 })

    return {
      ...speaker,
      imageUrl: speakerImageUrl,
      cdnImageUrl: speakerCdnImageUrl,
      bio: '',
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
  const speakerCdnImageUrl = getPhotonUrl({ src: speakerImageUrl, quality: 100, width: 200 })

  return {
    ...speaker,
    imageUrl: speakerImageUrl,
    cdnImageUrl: speakerCdnImageUrl,
    episodes: expand.episodes_via_speakers.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1).map(({ image, expand, ...episode }) => {
      const episodeImageUrl = getModelUrl({ model: episode, field: image })
      const episodeCdnImageUrl = getPhotonUrl({ src: episodeImageUrl, quality: 100, width: EPISODE_IMAGE_SIZE })
      return {
        ...episode,
        imageUrl: episodeImageUrl,
        cdnImageUrl: episodeCdnImageUrl
      }
    })
  }

}