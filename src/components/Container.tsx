import { clx } from "~/utils/helpers"


export default function Container({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={clx("max-w-3xl mx-auto p-4", className)}>
      {children}
    </div>
  )
}