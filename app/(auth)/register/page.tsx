"use client"

import Link from "next/link"
import { Button } from "@/shared_components/Button"
import { TextField } from "@/shared_components/Fields"
import { SlimLayout } from "@/shared_components/SlimLayout"
import { useState, useEffect } from "react"
import { createSBClient } from "@/utils/supabase-client"

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const supabase = createSBClient()

  useEffect(() => {
    const successMessage = new URLSearchParams(window.location.search).get(
      "success"
    )
    const errorMessage = new URLSearchParams(window.location.search).get(
      "error"
    )
    if (successMessage) setSuccess(decodeURIComponent(successMessage))
    if (errorMessage) setError(decodeURIComponent(errorMessage))
  }, [])

  const signUp = async (formData: FormData) => {
    setIsLoading(true)
    setError("")
    setSuccess("")

    const email = formData.get("email")?.toString()
    const password = formData.get("password")?.toString()

    if (!email || !password) {
      setError("Email and password are required")
      setIsLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error(error.code + " " + error.message)
      setError("Error trying to sign up")
    } else {
      setSuccess(
        "Thanks for signing up! Please check your email for a verification link."
      )
    }

    setIsLoading(false)
  }

  if (success) {
    return (
      <SlimLayout>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Success!
          </h2>
          <p className="text-gray-700">{success}</p>
          <Link
            href="/login"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Proceed to Login
          </Link>
        </div>
      </SlimLayout>
    )
  }

  return (
    <SlimLayout>
      <div className="flex">
        <Link
          href="/"
          aria-label="Home"
        >
          <div className="w-36 h-16">{""}</div>
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Get started for free
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Already registered?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign in
        </Link>{" "}
        to your account.
      </p>
      <form
        onSubmit={e => {
          e.preventDefault()
          signUp(new FormData(e.currentTarget))
        }}
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
      >
        <input
          type="hidden"
          name="action"
          value="signup"
        />
        <TextField
          label="First name"
          name="first_name"
          type="text"
          autoComplete="given-name"
          required
        />
        <TextField
          label="Last name"
          name="last_name"
          type="text"
          autoComplete="family-name"
          required
        />
        <TextField
          className="col-span-full"
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <TextField
          className="col-span-full"
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
        <TextField
          className="col-span-full"
          label="How did you hear about us?"
          name="referral_source"
          type="text"
        />
        {error && <div className="col-span-full text-red-600">{error}</div>}
        <div className="col-span-full">
          <Button
            type="submit"
            variant="solid"
            color="blue"
            className="w-full"
            disabled={isLoading}
          >
            <span>
              {isLoading ? "Signing up..." : "Sign up"}{" "}
              <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  )
}
