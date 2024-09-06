"use client"

import { Button } from "@/shared_components/Button"
import { TextField } from "@/shared_components/Fields"
import { createSBClient } from "@/utils/supabase-client"
import { useState } from "react"

export default function LoginForm() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const supabase = createSBClient()
  const signIn = async () => {
    if (!email || !password) {
      return { error: "Email and password are required" }
    }
    supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then(({ error }) => {
        if (error) {
          return { error }
        }
        return window.location.replace("/dashboard")
      })
      .catch(e => console.error(e))
  }
  return (
    <div className="mt-10 grid grid-cols-1 gap-y-8">
      <TextField
        label="Email address"
        name="email"
        value={email}
        type="email"
        autoComplete="email"
        onChange={e => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        value={password}
        name="password"
        type="password"
        autoComplete="current-password"
        onChange={e => setPassword(e.target.value)}
        required
      />

      <Button
        type="submit"
        variant="solid"
        color="blue"
        className="w-full"
        onClick={signIn}
      >
        <span>
          Sign in <span aria-hidden="true">&rarr;</span>
        </span>
      </Button>
    </div>
  )
}
