import clx from 'classnames'
import { IEpisode } from '~/types/interfaces'


export { clx }

export const formatTitle = (title: string): string[] => {
  return title.split(':')
}

export const getYouTubeIdFromUrl = (url: string) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(regex)

  return match ? match[1] : null
}

export const itHas = (val: unknown): boolean => !!val

export const getSpeakerName = (speaker: IEpisode['speakers'][0]) => speaker.nickname || speaker.name.split(' ')