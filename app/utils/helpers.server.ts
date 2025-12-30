import { API_URL } from './constants'

export const getFileUrl = ({
  field,
  collectionId,
  modelId
}: {
  collectionId: string
  field: string,
  modelId: string
}) => `https://q1f3.c18.e2-5.dev/techtalk/${collectionId}/${modelId}/${field}`

export const pickFields = (fields: string[]): string => fields.join(',')