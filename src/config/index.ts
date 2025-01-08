/*
 * This file should not be modified; use `env.ts` in the project root to add your client environment variables.
 * If you import `Config` from `@config`, this is the file that will be loaded.
 * You can only access the client environment variables here.
 * NOTE: We use js file so we can load the client env types
 */

import Constants from "expo-constants"

import { ClientEnv } from "../../env"

export const Config = (Constants.expoConfig?.extra ?? {}) as typeof ClientEnv
