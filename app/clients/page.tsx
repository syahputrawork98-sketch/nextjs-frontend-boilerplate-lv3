import { api, authHeaders } from "@/lib/api";
import { ErrorState } from "@/components/error-state";

export default async function ClientsPage() {
  try {
    const clients = await api.get("/clients", {
      headers: {
        ...authHeaders("dummy"),
        Prefer: "example=sample",
      },
    });

    return (
      <main style={{ padding: 24 }}>
        <h1>Clients</h1>
        <ul>
          {clients.map((c) => (
            <li key={c.id}>
              {c.name} ({c.contactEmail})
            </li>
          ))}
        </ul>
      </main>
    );
  } catch (err: any) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Clients</h1>
        <ErrorState message={err?.message ?? "Unknown error"} />
      </main>
    );
  }
}
