import { TNavLink } from "@/shared_components/Shared/types"
import { type Metadata } from "next"

export const homeMetaData: Metadata = {
  title: {
    template: "%s - Buys.ws",
    default: "Buys",
  },
  description: "Save time and money.",
}

export const homeNavLinks: TNavLink[] = []

export const authedNavLinks: TNavLink[] = []

export const appName = "Buys"
