import dayjs from 'dayjs'
import clx from 'classnames'

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

export const getSpeakerNickname = ({ name, nickname }: { name: string, nickname?: string }) => nickname || name.split(' ')[0]

export const removeHtmlTags = (htmlString: string) => {
  return htmlString.replace(/<[^>]*>/g, '')
}

export const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY')