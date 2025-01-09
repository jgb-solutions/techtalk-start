import { pb } from '~/services/pocketbase.server'

import type { RecordModel } from 'pocketbase'

export const getSearchParams = (request: Request) => new URL(request.url).searchParams

export const getUrl = (request: Request) => new URL(request.url)


export const getModelUrl = ({
  model,
  field,
  transform
}: {
  model: RecordModel
  field: string,
  transform?: Record<'thumb', string> | Record<string, string>
}) => {

  const url = pb.files.getURL(model, field, transform)


  return url
}

export const pickFields = (fields: string[]): string => fields.join(',')

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
