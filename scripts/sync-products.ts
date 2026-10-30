/**
 * Refresh src/jgb-products.json from the JGB Solutions products feed, and save each product's icon
 * in public/jgb-products/ (served from our own domain). Runs before every build (`bun run build`).
 * If the feed or an icon can't be reached or doesn't validate, the last copy is kept and the build
 * carries on.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { iconPath, parseProductsFeed, PRODUCTS_FEED_URL } from '../src/jgb-products';

const SNAPSHOT = fileURLToPath(new URL('../src/jgb-products.json', import.meta.url));
const PUBLIC = fileURLToPath(new URL('../public', import.meta.url));

try {
  const res = await fetch(PRODUCTS_FEED_URL, { signal: AbortSignal.timeout(5000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const products = parseProductsFeed(await res.json());
  await writeFile(SNAPSHOT, `${JSON.stringify({ version: 1, products }, null, 2)}\n`);
  console.log(`JGB products: ${products.length} from ${PRODUCTS_FEED_URL}`);
  await mkdir(`${PUBLIC}/jgb-products`, { recursive: true });
  for (const product of products) {
    const path = iconPath(product);
    if (!product.icon || !path) continue;
    try {
      const icon = await fetch(product.icon, { signal: AbortSignal.timeout(5000) });
      const type = icon.headers.get('content-type') ?? '';
      if (!icon.ok || !/^image\/(svg\+xml|png)/.test(type)) throw new Error(`HTTP ${icon.status} ${type}`);
      await writeFile(`${PUBLIC}${path}`, new Uint8Array(await icon.arrayBuffer()));
    } catch (error) {
      console.warn(`JGB products: kept the saved icon for ${product.id} (${error instanceof Error ? error.message : String(error)})`);
    }
  }
} catch (error) {
  console.warn(`JGB products: kept the saved list (${PRODUCTS_FEED_URL}: ${error instanceof Error ? error.message : String(error)})`);
}
