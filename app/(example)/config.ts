import { TNavLink } from "@/shared_components/Shared/types"
import { Metadata } from "next"

// Links that will appear on the homepage header.
export const homeNavLinks: TNavLink[] = [
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#pricing",
    label: "Pricing",
  },
]

// Used for html head metadata on home page.
export const homeMetaData: Metadata = {
  title: {
    template: "%s - Tax Pal",
    default: "Tax Pal",
  },
  description:
    "Tax Pal is a tax calculator that helps you estimate your tax refund.",
}

// Self explanatory.
export const appName = "Tax Pal"
