import { API_URL } from './constants'

export const getFileUrl = ({
  field,
  collectionId,
  modelId
}: {
  collectionId: string
  field: string,
  modelId: string
}) => `${API_URL}/api/files/${collectionId}/${modelId}/${field}`

export const pickFields = (fields: string[]): string => fields.join(',')