import { ClientConfig } from './types';

export function getClientConfig(): ClientConfig {
  const apiURL = import.meta.env.VITE_API_URL;

  if (!apiURL) {
    throw new Error('API URL not defined!');
  }

  return {
    API_URL: apiURL
  };
}
