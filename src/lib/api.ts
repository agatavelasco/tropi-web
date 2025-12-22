export const API_URL = "http://127.0.0.1:8000";

export async function apiGet(path: string) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`Erro ao buscar ${path}`);
  return res.json();
}

export async function apiPost(path: string, data: any) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Erro ao enviar para ${path}`);
  return res.json();
}

export async function apiPut(path: string, data: any) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Erro ao atualizar ${path}`);
  return res.json();
}

export async function apiDelete(path: string) {
  const res = await fetch(`${API_URL}${path}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Erro ao excluir ${path}`);
  return true;
}