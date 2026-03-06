import { supabase } from "./supabase";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

/**
 * Retorna os headers com o token JWT do Supabase (se logado).
 */
async function getAuthHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    headers["Authorization"] = `Bearer ${session.access_token}`;
  }

  return headers;
}

async function checkResponse(res: Response, label: string) {
  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail = body?.detail ?? JSON.stringify(body);
    } catch {
      detail = await res.text().catch(() => "");
    }
    throw new Error(`[${res.status}] ${label}${detail ? `: ${detail}` : ""}`);
  }
}

export async function apiGet(path: string) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}${path}`, { headers });
  await checkResponse(res, `GET ${path}`);
  return res.json();
}

export async function apiPost(path: string, data: unknown) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  await checkResponse(res, `POST ${path}`);
  return res.json();
}

export async function apiPut(path: string, data: unknown) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });
  await checkResponse(res, `PUT ${path}`);
  return res.json();
}

export async function apiDelete(path: string) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers,
  });
  await checkResponse(res, `DELETE ${path}`);
  return true;
}
