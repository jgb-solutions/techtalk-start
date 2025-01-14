import PocketBase from 'pocketbase'
import { API_URL } from '~/utils/constants'
// import { env } from '~/utils/constants.server'

export const pb = new PocketBase(API_URL)

// pb.collection('_superusers').authWithPassword(env.ADMIN_USERNAME, env.ADMIN_PASSWORD)