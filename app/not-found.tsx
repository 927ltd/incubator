import Link from "next/link"

import { Button } from "@/shared_components/Button"
import { SlimLayout } from "@/shared_components/SlimLayout"
import { genLogoFunc } from "./utility"

export default async function NotFound() {
  const logo = await genLogoFunc()

  return (
    <SlimLayout>
      <div className="flex">
        <Link
          href="/"
          aria-label="Home"
        >
          <div className="w-36 h-16">{logo()}</div>
        </Link>
      </div>
      <p className="mt-20 text-sm font-medium text-gray-700">404</p>
      <h1 className="mt-3 text-lg font-semibold text-gray-900">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-gray-700">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Button
        href="/"
        className="mt-10"
      >
        Go back home
      </Button>
    </SlimLayout>
  )
}
