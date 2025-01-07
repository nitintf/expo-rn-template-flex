import { createClient } from "@supabase/supabase-js"
import { AppState } from "react-native"

import Config from "@/config"
import * as SessionStorage from "@/utils/storage/session-storage"

export const supabase = createClient(Config.supabaseUrl, Config.supabaseAnonKey, {
  auth: {
    storage: SessionStorage,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
})

export { type Session, type AuthError } from "@supabase/supabase-js"

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
