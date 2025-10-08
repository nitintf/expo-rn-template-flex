import path from 'path';

import { config } from 'dotenv';
import { z } from 'zod';

import packageJSON from './package.json';

const APP_ENV = process.env.APP_ENV ?? 'development';
const envPath = path.resolve(__dirname, '.env');

config({ path: envPath });

const {
  EAS_PROJECT_ID,
  EXPO_PUBLIC_API_URL,
  BUNDLE_ID,
  PACKAGE,
  NAME,
  SCHEME,
} = process.env;

const clientSchema = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']),
  NAME: z.string(),
  VERSION: z.string(),
  API_URL: z.string().url('API_URL must be a valid URL'),
});

const buildTimeSchema = z.object({
  EAS_PROJECT_ID: z.string(),
  PACKAGE: z.string(),
  BUNDLE_ID: z.string(),
  SCHEME: z.string(),
});

const clientEnv = {
  APP_ENV,
  NAME,
  VERSION: packageJSON.version,
  API_URL: EXPO_PUBLIC_API_URL || 'https://api.example.com',
};

const buildTimeEnv = {
  EAS_PROJECT_ID,
  PACKAGE,
  BUNDLE_ID,
  SCHEME,
};

const validateEnv = () => {
  const mergedSchema = buildTimeSchema.merge(clientSchema);
  const env = {
    ...clientEnv,
    ...buildTimeEnv,
  };
  const parsed = mergedSchema.safeParse(env);

  if (!parsed.success) {
    const errorDetails = parsed.error.flatten();
    console.error(
      '❌ Invalid environment variables:',
      errorDetails.fieldErrors,
      '\n❌ Missing variables in .env file. Ensure all required variables are defined.',
      '\n💡 Tip: If you recently updated the .env file and the error persists, try restarting the server with the -c flag to clear the cache.',
    );
    const error = new Error(
      'Invalid environment variables. Check terminal for more details.',
    );
    error.name = 'EnvironmentValidationError';
    throw error;
  }

  return parsed.data;
};

export const Env = validateEnv();
export const ClientEnv = clientSchema.parse(clientEnv);
