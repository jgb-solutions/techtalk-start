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
    const episodeCdnImageUrl = getPhotonUrl({ src: episodeImageUrl, quality: 100, width: 500 })

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
  const episodeCdnImageUrl = getPhotonUrl({ src: episodeImageUrl, quality: 100, width: 500 })

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