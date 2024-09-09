import { Footer } from "@/shared_components/Footer"
import { Header } from "@/shared_components/Header"
import { redirect } from "next/navigation"
import { getConfig, genLogoFunc } from "@/app/utility"
import { TNavLink } from "@/shared_components/Shared/types"
import { createSBClient } from "@/utils/supabase-client"
import { User } from "@supabase/supabase-js"
const APP = process.env.NEXT_PUBLIC_APP

const genHomeContent = async () => {
  return import(`./(${APP})/components/HomeContent`).then(mod => mod.default)
}

const genServerAuthedRedirect = async (user: User | null) => {
  if (user) {
    return redirect("/dashboard")
  }
  return null
}

export default async function Home() {
  "use server"

  const config = getConfig()
  const HomeContent = await genHomeContent()
  const navLinks: TNavLink[] = await config.navLinks // Access navLinks from the default export
  const logo = await genLogoFunc()
  const supabase = createSBClient()
  const user = (await supabase.auth.getUser()).data.user
  console.log({ user })
  const redirect = await genServerAuthedRedirect(user)

  return redirect ? (
    redirect
  ) : (
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
