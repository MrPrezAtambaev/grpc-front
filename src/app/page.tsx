'use client';

import { useQuery } from "@tanstack/react-query"
import { client } from "@/lib/client"
import Link from "next/link";

export default function Home() {
  const query = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await client.todo.getAll.$get();
      return response.json();
    }
  })

  if (query.isLoading) return <p>Loading...</p>;
  if (query.error) return <p className="text-red-500">Error: {query.error.message}</p>;


  return (
    <div>
      {query.data?.todos.map((todo) => (
        <Link href={`/${todo.id}`} key={todo.id} className="cursor-pointer">
          <p>Todo #{todo.id}</p>
          <p>Name: {todo.name}</p>
          <p>Type: {todo.type}</p>
        </Link>
      ))}
    </div>
  )
}
