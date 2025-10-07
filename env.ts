import path from 'path';

import { config } from 'dotenv';
import { z } from 'zod';

import packageJSON from './package.json';

const APP_ENV = process.env.APP_ENV ?? 'development';
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

config({ path: envPath });

const BUNDLE_ID = 'com.changethis.expo';
const PACKAGE = 'com.changethis.expo';
const NAME = 'expo-temp';
const SCHEME = 'expo-temp';

const { EAS_PROJECT_ID, EXPO_PUBLIC_API_URL } = process.env;

const clientSchema = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']),
  NAME: z.string(),
  PACKAGE: z.string(),
  VERSION: z.string(),
  API_URL: z.string().url('API_URL must be a valid URL'),
});

const buildTimeSchema = z.object({
  EAS_PROJECT_ID: z.string(),
});

const clientEnv = {
  APP_ENV,
  NAME,
  VERSION: packageJSON.version,
  API_URL: EXPO_PUBLIC_API_URL || 'https://api.example.com',
};

const buildTimeEnv = {
  EAS_PROJECT_ID,
};

const validateEnv = () => {
  const mergedSchema = buildTimeSchema.merge(clientSchema);
  const env = {
    ...clientEnv,
    ...buildTimeEnv,
    EAS_PROJECT_ID,
    BUNDLE_ID,
    PACKAGE,
    NAME,
    SCHEME,
  };
  const parsed = mergedSchema.safeParse(env);

  if (!parsed.success) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors,
      `\n❌ Missing variables in .env.${APP_ENV} file. Ensure all required variables are defined.`,
      `\n💡 Tip: If you recently updated the .env.${APP_ENV} file and the error persists, try restarting the server with the -c flag to clear the cache.`,
    );
    throw new Error(
      'Invalid environment variables. Check terminal for more details.',
    );
  }

  return parsed.data;
};

export const Env = validateEnv();
export const ClientEnv = clientSchema.parse(clientEnv);
