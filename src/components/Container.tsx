import { clx } from "~/utils/helpers"

export default function Container({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={clx("max-w-7xl mx-auto p-4 sm:p-6", className)}>
      {children}
    </div>
  )
} 