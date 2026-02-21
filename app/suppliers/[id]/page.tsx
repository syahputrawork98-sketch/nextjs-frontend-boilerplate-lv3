import { api, authHeaders } from "@/lib/api";

type PageProps = {
  params: { id: string };
};

export default async function SupplierDetailPage({ params }: PageProps) {
  const supplier = await api.get("/suppliers/{id}", {
    path: { id: params.id },
    headers: {
      ...authHeaders("dummy"),
      Prefer: "example=sample",
    },
  });

  return (
    <main style={{ padding: 24 }}>
      <h1>Supplier Detail</h1>
      <p>ID: {supplier.id}</p>
      <p>Name: {supplier.name}</p>
      <p>Email: {supplier.contactEmail}</p>
    </main>
  );
}
