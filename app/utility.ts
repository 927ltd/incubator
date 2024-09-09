import { TIncubatorConfig } from "./config-type"

const APP = process.env.NEXT_PUBLIC_APP
const config = require(`@/app/(${APP})/config`).default

// allows loading diffirent logo with custom css className attribute for each app
export const genLogoFunc = async (): Promise<() => React.ReactElement> => {
  return (await import(`./(${APP})/components/Logo`)).default
}

export const getConfig: () => TIncubatorConfig = () => {
  // add dashboard to authedNavLinks
  const allAuthedNavLinks = [
    { href: "/dashboard", label: "Dashboard" },
    ...config.authedNavLinks,
  ]
  return {
    ...config,
    authedNavLinks: allAuthedNavLinks,
  }
}
