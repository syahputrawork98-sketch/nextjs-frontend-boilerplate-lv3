import type { paths } from "@/types/api";

type ApiError = {
  code: string;
  message: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3001";
  export function authHeaders(token?: string): HeadersInit {
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}


type HttpMethod = "get" | "post" | "put" | "delete";

type Operation<Path extends keyof paths, Method extends HttpMethod> =
  paths[Path][Method];

type ResponseJson<Path extends keyof paths, Method extends HttpMethod> =
  Operation<Path, Method> extends { responses: infer R }
    ? R extends { 200: any }
      ? R[200]["content"]["application/json"]
      : R extends { 201: any }
      ? R[201]["content"]["application/json"]
      : never
    : never;

type RequestBody<Path extends keyof paths, Method extends "post" | "put"> =
  Operation<Path, Method> extends { requestBody: infer B }
    ? B extends { content: infer C }
      ? C["application/json"]
      : never
    : never;

type PathParams<Path extends keyof paths, Method extends HttpMethod> =
  Operation<Path, Method> extends { parameters: infer P }
    ? P extends { path: infer PP }
      ? PP
      : never
    : never;

type QueryParams<Path extends keyof paths, Method extends HttpMethod> =
  Operation<Path, Method> extends { parameters: infer P }
    ? P extends { query: infer QP }
      ? QP
      : never
    : never;

function buildUrl(
  path: string,
  pathParams?: Record<string, string | number>,
  query?: Record<string, string | number | boolean | undefined>
) {
  let url = path;

  if (pathParams) {
    for (const [key, value] of Object.entries(pathParams)) {
      url = url.replace(`{${key}}`, encodeURIComponent(String(value)));
    }
  }

  const queryString = query
    ? Object.entries(query)
        .filter(([, v]) => v !== undefined)
        .map(
          ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`
        )
        .join("&")
    : "";

  return queryString ? `${url}?${queryString}` : url;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    let errBody: any = null;
    try {
      errBody = await res.json();
    } catch (_) {}

    const apiError: ApiError = errBody?.error ?? {
      code: "UNKNOWN_ERROR",
      message: res.statusText,
    };

    throw apiError;
  }

  if (res.status === 204) {
    return null as T;
  }

  return (await res.json()) as T;
}

export const api = {
  get<Path extends keyof paths>(
    path: Path,
    params?: {
      path?: PathParams<Path, "get">;
      query?: QueryParams<Path, "get">;
      headers?: HeadersInit;
    }
  ) {
    const url = buildUrl(path, params?.path as any, params?.query as any);
    return request<ResponseJson<Path, "get">>(url, {
      method: "GET",
      headers: params?.headers,
    });
  },

  post<Path extends keyof paths>(
    path: Path,
    body: RequestBody<Path, "post">,
    params?: {
      path?: PathParams<Path, "post">;
      query?: QueryParams<Path, "post">;
      headers?: HeadersInit;
    }
  ) {
    const url = buildUrl(path, params?.path as any, params?.query as any);
    return request<ResponseJson<Path, "post">>(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: params?.headers,
    });
  },

  put<Path extends keyof paths>(
    path: Path,
    body: RequestBody<Path, "put">,
    params?: {
      path?: PathParams<Path, "put">;
      query?: QueryParams<Path, "put">;
      headers?: HeadersInit;
    }
  ) {
    const url = buildUrl(path, params?.path as any, params?.query as any);
    return request<ResponseJson<Path, "put">>(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: params?.headers,
    });
  },

  delete<Path extends keyof paths>(
    path: Path,
    params?: {
      path?: PathParams<Path, "delete">;
      query?: QueryParams<Path, "delete">;
      headers?: HeadersInit;
    }
  ) {
    const url = buildUrl(path, params?.path as any, params?.query as any);
    return request<ResponseJson<Path, "delete">>(url, {
      method: "DELETE",
      headers: params?.headers,
    });
  },
};
