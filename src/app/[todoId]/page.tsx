'use client'

import { client } from '@/lib/client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react'

const TodoById = () => {
  const { todoId } = useParams<{ todoId: string }>();
  const query = useQuery({
    queryKey: ['todos', todoId],
    queryFn: async () => {
      const response = await client.todo.getById.$get({ id: Number(todoId) ?? 1 });
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

export default TodoById