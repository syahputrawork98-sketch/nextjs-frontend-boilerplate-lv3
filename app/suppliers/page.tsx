import { api, authHeaders } from "@/lib/api";

export default async function SuppliersPage() {
  const suppliers = await api.get("/suppliers", {
    headers: {
      ...authHeaders("dummy"),
      Prefer: "example=sample",
    },
  });

  return (
    <main style={{ padding: 24 }}>
      <h1>Suppliers</h1>
      <ul>
        {suppliers.map((s) => (
          <li key={s.id}>
            {s.name} ({s.contactEmail})
          </li>
        ))}
      </ul>
    </main>
  );
}
