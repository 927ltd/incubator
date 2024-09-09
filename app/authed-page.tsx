import { Container } from "@/shared_components/Container"
import { Footer } from "@/shared_components/Footer"
import { Header } from "@/shared_components/Header"
import { genLogoFunc, getConfig } from "@/app/utility"
import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { User } from "@supabase/supabase-js"
import { createServerSBClient } from "@/utils/supabase-server"

const genServerAuthedRedirect = async (user: User | null) => {
  if (!user) {
    return redirect("/")
  }
}

const AuthedPage: React.FC<{ children: ReactNode }> = async ({ children }) => {
  const logo = await genLogoFunc()
  const user = (await createServerSBClient().auth.getUser()).data.user
  const authedNavLinks = getConfig().authedNavLinks
  const redirect = await genServerAuthedRedirect(user)

  return redirect ? (
    redirect
  ) : (
    <>
      <Header
        user={user}
        logo={logo()}
        navLinks={authedNavLinks}
      />
      <main>
        <Container>{children}</Container>
      </main>
      <Footer logo={logo()} />
    </>
  )
}

export default AuthedPage
