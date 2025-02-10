'use client';

import { useQuery } from "@tanstack/react-query"
import { client } from "@/lib/client"

export default function Home() {
  const query = useQuery({
    queryKey: ['todos', 1],
    queryFn: async () => {
      const response = await client.todo.getById.$get({ id: 1 });
      return response.json();
    }
  })

  if (query.isLoading) return <p>Loading...</p>;
  if (query.error) return <p className="text-red-500">Error: {query.error.message}</p>;


  return (
    <div>
      <p>Todo #{query.data?.id}</p>
      <p>Name: {query.data?.name}</p>
      <p>Type: {query.data?.type}</p>
    </div>
  )
}
