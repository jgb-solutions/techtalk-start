import { byCategory, iconPath, otherJgbProducts } from '~/jgb-products'
import { JgbSolutionsLogo } from './JgbSolutionsLogo'

/**
 * "Plis nan JGB Solutions" (the company's other products by category, each as its icon and name,
 * framed on three sides) and "Yon pwodwi JGB Solutions", like every JGB product. The list comes
 * from jgb.solutions/products.json, saved at build time (scripts/sync-products.ts).
 */
export default function JgbFooter() {
  return (
    <div className="border-t border-white/10 px-4 pb-8">
      <nav aria-labelledby="footer-jgb" className="mx-auto mb-10 max-w-4xl rounded-b-2xl border-x border-b border-white/15 px-4 pt-8 pb-8 sm:px-6">
        <h2 id="footer-jgb" className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
          Plis nan JGB Solutions
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-8">
          {byCategory(otherJgbProducts('techtalk')).map(({ category, products }) => (
            <div key={category}>
              <h3 className="mb-3 text-xs font-semibold text-white/60">{category}</h3>
              <ul className="space-y-3">
                {products.map((product) => {
                  const icon = iconPath(product)
                  return (
                    <li key={product.id}>
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener"
                        title={product.tagline}
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-tt-yellow"
                      >
                        {icon ? (
                          <img src={icon} alt="" width={20} height={20} loading="lazy" className="size-5 shrink-0 rounded" />
                        ) : (
                          <span aria-hidden="true" className="size-5 shrink-0 rounded bg-white/10" />
                        )}
                        {product.name}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>
      <a
        href="https://jgb.solutions"
        target="_blank"
        rel="noopener"
        aria-label="Yon pwodwi JGB Solutions"
        className="group mx-auto flex w-fit flex-col items-center gap-2 transition-opacity hover:opacity-90"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Yon pwodwi</span>
        <JgbSolutionsLogo className="h-6 w-auto" />
      </a>
    </div>
  )
}
