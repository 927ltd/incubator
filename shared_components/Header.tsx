"use client"

import Link from "next/link"
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from "@headlessui/react"
import clsx from "clsx"

import { Button } from "@/shared_components/Button"
import { Container } from "@/shared_components/Container"
import { NavLink } from "@/shared_components/NavLink"
import { User } from "@supabase/supabase-js"
import { TNavLink } from "./Shared/types"
import React from "react"
import { createSBClient } from "@/utils/supabase-client"
import { getConfig } from "@/app/utility"

type THeaderProps = {
  navLinks?: TNavLink[]
  user: User | null
  logo: React.ReactElement
}

function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <PopoverButton
      as={Link}
      href={href}
      className="block w-full p-2"
    >
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          "origin-center transition",
          open && "scale-90 opacity-0"
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          "origin-center transition",
          !open && "scale-90 opacity-0"
        )}
      />
    </svg>
  )
}

function MobileNavigation(props: THeaderProps) {
  const supabase = createSBClient()

  return (
    <div className="flex items-center gap-x-5">
      {!props.user && (
        <>
          <NavLink href="/login">Sign in</NavLink>
          <NavLink href="/register">
            Get started <span className="hidden lg:inline">today</span>
          </NavLink>
        </>
      )}
      {(props.user || (props.navLinks?.length ?? 0) > 0) && (
        <Popover>
          {({ open }) => (
            <>
              <PopoverButton
                className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
                aria-label="Toggle Navigation"
              >
                <MobileNavIcon open={open} />
              </PopoverButton>
              <PopoverBackdrop className="fixed inset-0 bg-slate-300/50 duration-150 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in" />
              <PopoverPanel className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-150 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in">
                {props?.user && (
                  <span className="text-sm">{props.user?.email}</span>
                )}
                <hr className="m-2 border-slate-300/40" />

                {props?.navLinks?.map(navLink => (
                  <MobileNavLink
                    key={navLink.href}
                    href={navLink.href}
                  >
                    {navLink.label}
                  </MobileNavLink>
                ))}
                {props.user && (
                  <div className="flex flex-col items-start gap-4">
                    <form
                      action="#"
                      className=""
                    >
                      <Button
                        type="submit"
                        variant="outline"
                        formAction={() => {
                          supabase.auth.signOut().then(() => {
                            window.location.href = "/"
                          })
                        }}
                      >
                        <span>Sign out</span>
                      </Button>
                    </form>
                  </div>
                )}
              </PopoverPanel>
            </>
          )}
        </Popover>
      )}
    </div>
  )
}

export function Header(props: THeaderProps) {
  const supabase = createSBClient()
  const config = getConfig()

  return (
    <header
      data-testid="header"
      className="py-10"
    >
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <div className="w-24 h-12">{props.logo}</div>
            <div className="hidden md:flex md:gap-x-6">
              {props.navLinks?.map(navLink => (
                <NavLink
                  key={navLink.href}
                  href={navLink.href}
                >
                  {navLink.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-x-5 md:gap-x-8">
            {config.hasAuth && (
              <div className="hidden md:block">
                {props.user ? (
                  <div className="flex items-center gap-x-5 md:gap-x-8">
                    <span>{props.user?.email}</span>
                    <form
                      action="#"
                      className="grid grid-cols-1 gap-y-8"
                    >
                      <Button
                        type="submit"
                        variant="outline"
                        className="w-full"
                        data-testid="sign-out-button"
                        formAction={() => {
                          supabase.auth.signOut().then(() => {
                            window.location.href = "/"
                          })
                        }}
                      >
                        <span>
                          Sign out <span aria-hidden="true">&rarr;</span>
                        </span>
                      </Button>
                    </form>
                  </div>
                ) : (
                  <div className="flex items-center gap-x-5 md:gap-x-8">
                    <div
                      className="hidden md:block"
                      data-testid="sign-in-link"
                    >
                      <NavLink href="/login">Sign in</NavLink>
                    </div>
                    <Button
                      href="/register"
                      color="blue"
                      data-testid="get-started-button"
                    >
                      <span>
                        Get started{" "}
                        <span className="hidden lg:inline">today</span>
                      </span>
                    </Button>
                  </div>
                )}
              </div>
            )}
            <div className="-mr-1 md:hidden">
              <MobileNavigation {...props} />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
