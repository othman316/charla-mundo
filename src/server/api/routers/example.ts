import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { redis } from "~/server/redisDB";

export const exampleRouter = createTRPCRouter({
  addValue: publicProcedure
    .input(z.object({ value: z.string() }))
    .mutation(async ({ input }) => {
      await redis.set('key', input);
    }),

  getValue: publicProcedure.query(async () => {
    const data = await redis.get('key');

    return data
  }),
});
