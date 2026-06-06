import { Result } from './types';

type HttpRequestConfig = RequestInit & {
  params?: Record<string, string>;
};

const createAPIClient = (baseURL: string) => {
  async function http<TResponse>(
    path: string,
    config: HttpRequestConfig = {}
  ): Promise<Result<TResponse>> {
    const { params, ...init } = config;

    const normalizedBase = baseURL.replace(/\/$/, '');
    const normalizedPath = path.replace(/^\//, '');
    const url = new URL(`${normalizedBase}/${normalizedPath}`);

    if (params) {
      Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]!));
    }

    const headers = new Headers(init.headers);
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(url.toString(), {
      ...init,
      headers
    });

    if (!response.ok) {
      return {
        ok: false,
        data: null,
        error: new Error(`Status ${response.status}`)
      };
    }

    const data = await response.json();
    return { ok: true, data, error: null };
  }

  return {
    get: <TResponse>(path: string, config?: HttpRequestConfig) =>
      http<TResponse>(path, { ...config, method: 'GET' }),

    post: <TResponse, TRequest = unknown>(
      path: string,
      body: TRequest,
      config?: HttpRequestConfig
    ) => http<TResponse>(path, { ...config, method: 'POST', body: JSON.stringify(body) }),

    put: <TResponse, TRequest = unknown>(
      path: string,
      body: TRequest,
      config?: HttpRequestConfig
    ) => http<TResponse>(path, { ...config, method: 'PUT', body: JSON.stringify(body) }),

    delete: <TResponse>(path: string, config?: HttpRequestConfig) =>
      http<TResponse>(path, { ...config, method: 'DELETE' })
  };
};

export default createAPIClient;
