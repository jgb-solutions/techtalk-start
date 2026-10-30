import snapshot from './jgb-products.json'

/**
 * JGB Solutions' products, for the "More from JGB Solutions" links. The list itself lives in the
 * jgb-solutions repo and is published at PRODUCTS_FEED_URL; scripts/sync-products.ts
 * refreshes the copy in jgb-products.json before each website build (keeping the last copy if the
 * feed can't be reached), so a new product appears here on the next build.
 */
export const PRODUCTS_FEED_URL = 'https://jgb.solutions/products.json'

const KINDS = ['web-app', 'game', 'media'] as const
export type JgbProductKind = (typeof KINDS)[number]

export type JgbProduct = {
  id: string
  name: string
  tagline: string
  url: string
  kind: JgbProductKind
  /** The footer column it's listed under ("Entertainment", "Games"…). */
  category: string
  /** Its square icon on jgb.solutions, or null; the build copies it into public/ (iconPath). */
  icon: string | null
}

/** Columns for products from an older feed without categories. */
const KIND_CATEGORY: Record<JgbProductKind, string> = { 'web-app': 'Apps', game: 'Games', media: 'Media' }

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null
const isKind = (value: unknown): value is JgbProductKind => KINDS.some((kind) => kind === value)

function nonEmptyString(record: Record<string, unknown>, key: string): string {
  const value = record[key]
  if (typeof value !== 'string' || value.trim() === '') throw new Error(`products feed: "${key}" must be a non-empty string`)
  return value
}

/** Checks a products feed (version 1) and returns its products. Throws if anything is off. */
export function parseProductsFeed(feed: unknown): JgbProduct[] {
  if (!isRecord(feed) || feed.version !== 1 || !Array.isArray(feed.products)) {
    throw new Error('products feed: expected { version: 1, products: [...] }')
  }
  return feed.products.map((item: unknown) => {
    if (!isRecord(item)) throw new Error('products feed: each product must be an object')
    const url = nonEmptyString(item, 'url')
    if (!url.startsWith('https://')) throw new Error(`products feed: "${url}" isn't an https URL`)
    if (!isKind(item.kind)) throw new Error(`products feed: unknown kind "${String(item.kind)}"`)
    const icon = typeof item.icon === 'string' && /^https:\/\/.+\.(svg|png)$/.test(item.icon) ? item.icon : null
    return {
      id: nonEmptyString(item, 'id'),
      name: nonEmptyString(item, 'name'),
      tagline: nonEmptyString(item, 'tagline'),
      url,
      kind: item.kind,
      category: typeof item.category === 'string' && item.category.trim() ? item.category : KIND_CATEGORY[item.kind],
      icon,
    }
  })
}

export const JGB_PRODUCTS: readonly JgbProduct[] = parseProductsFeed(snapshot)

/** Where the build saved a product's icon (scripts/sync-products.ts), or null. */
export function iconPath(product: Pick<JgbProduct, 'id' | 'icon'>): string | null {
  const ext = product.icon?.match(/\.(svg|png)$/)?.[1]
  return ext ? `/jgb-products/${product.id}.${ext}` : null
}

/** Products grouped by category, in the order categories first appear in the feed. */
export function byCategory(products: readonly JgbProduct[]): { category: string; products: JgbProduct[] }[] {
  const groups = new Map<string, JgbProduct[]>()
  for (const product of products) groups.set(product.category, [...(groups.get(product.category) ?? []), product])
  return [...groups].map(([category, items]) => ({ category, products: items }))
}

/** Every JGB product except the one showing the list. */
export const otherJgbProducts = (currentId: string) => JGB_PRODUCTS.filter((product) => product.id !== currentId)
