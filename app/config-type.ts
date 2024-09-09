import { TNavLink } from "@/shared_components/Shared/types"
import { type Metadata } from "next"

export type TIncubatorConfig = {
  appName: string
  hasAuth: boolean
  metadata: Metadata
  authedNavLinks: TNavLink[]
  navLinks: TNavLink[]
}
