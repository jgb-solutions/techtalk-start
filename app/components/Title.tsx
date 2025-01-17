import { clx } from "~/utils/helpers"

export default function Title({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <h2 className={clx("text-4xl sm:text-6xl font-bold text-center mb-6", className)}>{children}</h2>
  )
}