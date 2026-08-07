// Server-only Supabase client for the shared CALP Training Hub database.
// The database is NOT publicly readable: this site reaches it exclusively
// from the server using the secret service key, so no anonymous policies or
// grants are required on courses / trainers / trainings / participants.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./db-types";

const SHARED_SUPABASE_URL = "https://gyvfccrflinrxdxyssfz.supabase.co";

let _client: SupabaseClient<Database> | undefined;

export function getSharedDb(): SupabaseClient<Database> {
  if (_client) return _client;

  const key = process.env["SHARED_SUPABASE_SERVICE_ROLE_KEY"];
  if (!key) {
    throw new Error(
      "SHARED_SUPABASE_SERVICE_ROLE_KEY is not configured on the server.",
    );
  }
  const url = process.env["SHARED_SUPABASE_URL"] || SHARED_SUPABASE_URL;

  _client = createClient<Database>(url, key, {
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      // New-format Supabase keys are opaque strings, not bearer JWTs.
      fetch: (input, init) => {
        const headers = new Headers(
          typeof Request !== "undefined" && input instanceof Request
            ? input.headers
            : undefined,
        );
        if (init?.headers) {
          new Headers(init.headers).forEach((v, k) => headers.set(k, v));
        }
        if (
          (key.startsWith("sb_secret_") || key.startsWith("sb_publishable_")) &&
          headers.get("Authorization") === `Bearer ${key}`
        ) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });

  return _client;
}
