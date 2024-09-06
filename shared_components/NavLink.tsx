import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const pathName = usePathname()
  const isActive = pathName === href

  return (
    <Link
      href={href}
      className={
        isActive
          ? "inline-block rounded-lg px-2 py-1 text-sm text-slate-900 bg-slate-200"
          : "inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
      }
    >
      {children}
    </Link>
  )
}
