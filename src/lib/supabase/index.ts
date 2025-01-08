import { createClient, Provider } from "@supabase/supabase-js"
import { AppState, Platform } from "react-native"

import { Config } from "@/config"
import * as SessionStorage from "@/utils/storage/session-storage"

// Define supported auth providers
export const AUTH_PROVIDERS = {
  GOOGLE: "google",
  APPLE: Platform.OS === "ios" ? "apple" : null,
} as const

// Enhanced Supabase client with better configuration
export const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_ANON_KEY, {
  auth: {
    storage: SessionStorage,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    flowType: "pkce", // More secure authentication flow
    persistSession: true,
  },
})

export {
  type Session,
  type AuthError,
  type Provider,
  type OAuthResponse,
} from "@supabase/supabase-js"

// Auth helper functions
export const signInWithProvider = async (provider: Provider) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${Config.SUPABASE_URL}/auth/v1/callback`,
        ...(Platform.OS === "ios" && provider === "apple"
          ? { queryParams: { prompt: "consent" } }
          : {}),
      },
    })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error }
  }
}

/**
 * Tells Supabase to autorefresh the session while the application
 * is in the foreground. (Docs: https://supabase.com/docs/reference/javascript/auth-startautorefresh)
 */
AppState.addEventListener("change", (nextAppState) => {
  if (nextAppState === "active") {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})
