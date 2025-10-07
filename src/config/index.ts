/*
 * This file should not be modified; use `env.ts` in the project root to add your client environment variables.
 */

import Constants from 'expo-constants';

import type { ClientEnv } from '../../env';

export const Config = (Constants.expoConfig?.extra ?? {}) as typeof ClientEnv;
