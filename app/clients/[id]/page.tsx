import { api, authHeaders } from "@/lib/api";

type PageProps = {
  params: { id: string };
};

export default async function ClientDetailPage({ params }: PageProps) {
  const client = await api.get("/clients/{id}", {
    path: { id: params.id },
    headers: {
      ...authHeaders("dummy"),
      Prefer: "example=sample",
    },
  });

  return (
    <main style={{ padding: 24 }}>
      <h1>Client Detail</h1>
      <p>ID: {client.id}</p>
      <p>Name: {client.name}</p>
      <p>Email: {client.contactEmail}</p>
    </main>
  );
}
