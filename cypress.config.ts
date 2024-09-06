import { defineConfig } from "cypress"
import dotenv from "dotenv"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Replace with your actual development server URL
    supportFile: false,
  },
})
