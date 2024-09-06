import { Container } from "@/shared_components/Container"
import { Footer } from "@/shared_components/Footer"
import { Header } from "@/shared_components/Header"
import { genLogoFunc } from "@/app/utility"
import { ReactNode } from "react"
import { createServerSBClient } from "@/utils/supabase-server"

const AuthedPage: React.FC<{ children: ReactNode }> = async ({ children }) => {
  const logo = await genLogoFunc()
  const supabase = createServerSBClient()
  const user = (await supabase.auth.getUser()).data.user
  const session_user = (await supabase.auth.getUser()).data?.user ?? null

  const configNavLinks =
    require(`@/app/(receipt_splitter)/config`).authedNavLinks

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    ...configNavLinks,
  ]

  return (
    <>
      <Header
        user={user || session_user}
        logo={logo()}
        navLinks={navLinks}
      />
      <main>
        <Container>{children}</Container>
      </main>
      <Footer logo={logo()} />
    </>
  )
}

export default AuthedPage
