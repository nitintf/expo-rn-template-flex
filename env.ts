import path from "path"

import { config } from "dotenv"
import z from "zod"

import packageJSON from "./package.json"

const APP_ENV = process.env.APP_ENV ?? "development"
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`)

config({ path: envPath })

const BUNDLE_ID = "com.repsy"
const PACKAGE = "com.repsy"
const NAME = "Repsy"
const EXPO_ACCOUNT_OWNER = "repsy"
const EAS_PROJECT_ID = "f4e819b4-ee87-49e1-8286-5ea9ffac005c"
const SCHEME = "repsy"

const withEnvSuffix = (name: string) => (APP_ENV === "production" ? name : `${name}.${APP_ENV}`)

const clientSchema = z.object({
  APP_ENV: z.enum(["development", "staging", "production"]),
  NAME: z.string(),
  SCHEME: z.string(),
  BUNDLE_ID: z.string(),
  PACKAGE: z.string(),
  VERSION: z.string(),
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
})

const buildTimeSchema = z.object({
  EXPO_ACCOUNT_OWNER: z.string(),
  EAS_PROJECT_ID: z.string(),
})

const clientEnv = {
  APP_ENV,
  NAME,
  SCHEME,
  BUNDLE_ID: withEnvSuffix(BUNDLE_ID),
  PACKAGE: withEnvSuffix(PACKAGE),
  VERSION: packageJSON.version,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
}

const buildTimeEnv = {
  EXPO_ACCOUNT_OWNER,
  EAS_PROJECT_ID,
}

const validateEnv = () => {
  const mergedSchema = buildTimeSchema.merge(clientSchema)
  const env = { ...clientEnv, ...buildTimeEnv }
  const parsed = mergedSchema.safeParse(env)

  if (!parsed.success) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors,
      `\n❌ Missing variables in .env.${APP_ENV} file. Ensure all required variables are defined.`,
      `\n💡 Tip: If you recently updated the .env.${APP_ENV} file and the error persists, try restarting the server with the -c flag to clear the cache.`,
    )
    throw new Error("Invalid environment variables. Check terminal for more details.")
  }

  return parsed.data
}

export const Env = validateEnv()
export const ClientEnv = clientSchema.parse(clientEnv)
