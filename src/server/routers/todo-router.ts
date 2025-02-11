import { z } from "zod";
import { j, publicProcedure } from "../jstack";
import { Todo, Todos, TodoServiceClient } from "@/proto/todo";
import { ChannelCredentials } from "@grpc/grpc-js";

export const todoRouter = j.router({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, c }) => {
      const channelCredentials = ChannelCredentials.createInsecure()
      const client = new TodoServiceClient('localhost:50051', channelCredentials);
      const response = await new Promise<Todo>((resolve, reject) => {
        client.findOne({ id: input.id }, (err, res) => {
          if (err) return reject(err);
          resolve(res);
        });
      });

      return c.superjson(response);
    }),

  getAll: publicProcedure.query(async ({ c }) => {
    const channelCredentials = ChannelCredentials.createInsecure()
    const client = new TodoServiceClient('localhost:50051', channelCredentials);
    const response = await new Promise<Todos>((resolve, reject) => {
      client.findAll({}, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
    return c.superjson(response);
  }),
});