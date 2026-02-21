import { api, authHeaders } from "@/lib/api";

export default async function ContractsPage() {
  const contracts = await api.get("/contracts", {
    query: { projectId: "prj_001" },
    headers: {
      ...authHeaders("dummy"),
      Prefer: "example=sample",
    },
  });

  return (
    <main style={{ padding: 24 }}>
      <h1>Contracts</h1>
      <ul>
        {contracts.map((c) => (
          <li key={c.id}>
            {c.scope} — {c.projectId}
          </li>
        ))}
      </ul>
    </main>
  );
}
