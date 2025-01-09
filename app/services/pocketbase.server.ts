import PocketBase from 'pocketbase'
import { env } from '~/utils/constants.server'

export const pb = new PocketBase(env.API_URL)

pb.collection('_superusers').authWithPassword(env.ADMIN_USERNAME, env.ADMIN_PASSWORD)