import { TNavLink } from "@/shared_components/Shared/types"
import { type Metadata } from "next"

export const homeMetaData: Metadata = {
  title: {
    template: "%s - Receipt Splitter",
    default: "Receipt Splitter",
  },
  description: "Split your receipts with ease.",
}

export const homeNavLinks: TNavLink[] = []

export const authedNavLinks: TNavLink[] = [
  {
    href: "/orders",
    label: "Orders",
  },
]

export const appName = "Receipt Splitter"
