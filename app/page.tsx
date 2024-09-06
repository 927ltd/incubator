import { Footer } from "@/shared_components/Footer"
import { Header } from "@/shared_components/Header"
import { redirect } from "next/navigation"
import { genLogoFunc } from "@/app/utility"
import { TNavLink } from "@/shared_components/Shared/types"
import { createSBClient } from "@/utils/supabase-client"

const app = process.env.NEXT_PUBLIC_APP

const getHomeContent = async () => {
  return import(`./(${app})/components/HomeContent`).then(mod => mod.default)
}
const getHomeNavLinks = async () => {
  return import(`./(${app})/config`).then(mod => mod.homeNavLinks)
}

export default async function Home() {
  "use server"

  const supabase = createSBClient()

  const user = (await supabase.auth.getUser()).data.user
  if (user) {
    return redirect("/dashboard")
  }

  const HomeContent = await getHomeContent()
  const navLinks: TNavLink[] = await getHomeNavLinks()
  const logo = await genLogoFunc()

  return (
    <>
      <Header
        navLinks={navLinks}
        user={user}
        logo={logo()}
      />
      <main>
        <HomeContent />
      </main>
      <Footer
        navLinks={navLinks}
        logo={logo()}
      />
    </>
  )
}
