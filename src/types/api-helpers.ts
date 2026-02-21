import type { paths } from "@/types/api";

// Response helper untuk GET
export type GetResponse<
  Path extends keyof paths
> = paths[Path]["get"] extends { responses: infer R }
  ? R extends { 200: any }
    ? R[200]["content"]["application/json"]
    : never
  : never;

// Response helper untuk POST
export type PostResponse<
  Path extends keyof paths
> = paths[Path]["post"] extends { responses: infer R }
  ? R extends { 200: any }
    ? R[200]["content"]["application/json"]
    : R extends { 201: any }
    ? R[201]["content"]["application/json"]
    : never
  : never;

// Request body helper untuk POST/PUT
export type RequestBody<
  Path extends keyof paths,
  Method extends "post" | "put"
> = paths[Path][Method] extends { requestBody: infer B }
  ? B extends { content: infer C }
    ? C["application/json"]
    : never
  : never;
