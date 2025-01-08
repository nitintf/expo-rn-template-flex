/* eslint-env node */
/*
 * Env file to load and validate env variables
 * Be cautious; this file should not be imported into your source folder.
 * We split the env variables into two parts:
 * 1. Client variables: These variables are used in the client-side code (src folder).
 * 2. Build-time variables: These variables are used in the build process (app.config.ts file).
 * Import this file into the `app.config.ts` file to use environment variables during the build process. The client variables can then be passed to the client-side using the extra field in the `app.config.ts` file.
 * To access the client environment variables in your `src` folder, you can import them from `@env`. For example: `import Env from '@env'`.
 */
/**
 * 1st part: Import packages and Load your env variables
 * we use dotenv to load the correct variables from the .env file based on the APP_ENV variable (default is development)
 * APP_ENV is passed as an inline variable while executing the command, for example: APP_ENV=staging pnpm build:android
 */
import path from "path"

import z from "zod"

import packageJSON from "./package.json"

const APP_ENV = process.env.APP_ENV ?? "development"
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`)

require("dotenv").config({
  path: envPath,
})

/**
 * 2nd part: Define some static variables for the app
 * Such as: bundle id, package name, app name.
 *
 * You can add them to the .env file but we think it's better to keep them here as as we use prefix to generate this values based on the APP_ENV
 * for example: if the APP_ENV is staging, the bundle id will be com.obytes.staging
 */

const BUNDLE_ID = "com.repsy" // ios bundle id
const PACKAGE = "com.repsy" // android package name
const NAME = "Repsy" // app name
const EXPO_ACCOUNT_OWNER = "repsy" // expo account owner
const EAS_PROJECT_ID = "f4e819b4-ee87-49e1-8286-5ea9ffac005c" // eas project id
const SCHEME = "repsy" // app scheme

/**
 * We declare a function withEnvSuffix that will add a suffix to the variable name based on the APP_ENV
 * Add a suffix to variable env based on APP_ENV
 */
export const withEnvSuffix = (name: string) => {
  return APP_ENV === "production" ? name : `${name}.${APP_ENV}`
}

/**
 * 2nd part: Define your env variables schema
 * we use zod to define our env variables schema
 *
 * we split the env variables into two parts:
 *    1. client: These variables are used in the client-side code (`src` folder).
 *    2. buildTime: These variables are used in the build process (app.config.ts file). You can think of them as server-side variables.
 *
 * Main rules:
 *    1. If you need your variable on the client-side, you should add it to the client schema; otherwise, you should add it to the buildTime schema.
 *    2. Whenever you want to add a new variable, you should add it to the correct schema based on the previous rule, then you should add it to the corresponding object (_clientEnv or _buildTimeEnv).
 *
 * Note: `z.string()` means that the variable exists and can be an empty string, but not `undefined`.
 * If you want to make the variable required, you should use `z.string().min(1)` instead.
 * Read more about zod here: https://zod.dev/?id=strings
 *
 */

const client = z.object({
  APP_ENV: z.enum(["development", "staging", "production"]),
  NAME: z.string(),
  SCHEME: z.string(),
  BUNDLE_ID: z.string(),
  PACKAGE: z.string(),
  VERSION: z.string(),

  // ADD YOUR CLIENT ENV VARS HERE
  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),
})

const buildTime = z.object({
  EXPO_ACCOUNT_OWNER: z.string(),
  EAS_PROJECT_ID: z.string(),
  // ADD YOUR BUILD TIME ENV VARS HERE
})

const _clientEnv: Record<keyof z.infer<typeof client>, unknown> = {
  APP_ENV,
  NAME,
  SCHEME,
  BUNDLE_ID: withEnvSuffix(BUNDLE_ID),
  PACKAGE: withEnvSuffix(PACKAGE),
  VERSION: packageJSON.version,

  // ADD YOUR ENV VARS HERE TOO
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
}

const _buildTimeEnv: Record<keyof z.infer<typeof buildTime>, unknown> = {
  EXPO_ACCOUNT_OWNER,
  EAS_PROJECT_ID,
  // ADD YOUR ENV VARS HERE TOO
}

/**
 * 3rd part: Merge and Validate your env variables
 * We use zod to validate our env variables based on the schema we defined above
 * If the validation fails we throw an error and log the error to the console with a detailed message about missed variables
 * If the validation passes we export the merged and parsed env variables to be used in the app.config.ts file as well as a ClientEnv object to be used in the client-side code
 **/
const _env = {
  ..._clientEnv,
  ..._buildTimeEnv,
}

const merged = buildTime.merge(client)
const parsed = merged.safeParse(_env)

if (parsed.success === false) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors,

    `\n❌ Missing variables in .env.${APP_ENV} file, Make sure all required variables are defined in the .env.${APP_ENV} file.`,
    `\n💡 Tip: If you recently updated the .env.${APP_ENV} file and the error still persists, try restarting the server with the -c flag to clear the cache.`,
  )
  throw new Error("Invalid environment variables, Check terminal for more details ")
}

export const Env = parsed.data
export const ClientEnv = client.parse(_clientEnv)
