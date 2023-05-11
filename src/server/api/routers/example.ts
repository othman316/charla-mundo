import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { redis } from "~/server/redisDB";


type redisValue = {
  value: string
}

export const exampleRouter = createTRPCRouter({
  addValue: publicProcedure
    .input(z.object({ value: z.string() }))
    .mutation(async ({ input }) => {
      await redis.set('key', input);
    }),
  addValueMySQL: publicProcedure
    .input(z.object({ value: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.value.update({ where: { id: 'clhir8s4j0000jhmjma1cjsvk' }, data: { value: input.value } })
    }),

  getValue: publicProcedure
    .output(z.object({ value: z.string() }))
    .query(async () => {
      const data: redisValue | null = await redis.get('key');
      if (!data) throw new TRPCError({ code: "NOT_FOUND", message: "Not a string" })

      return data;
    }),
  getValueMySQL: publicProcedure
    .output(z.object({ value: z.string() }))
    .query(async ({ ctx }) => {
      const data = await ctx.prisma.value.findFirst({ where: { id: { equals: 'clhir8s4j0000jhmjma1cjsvk' } } })
      if (!data) throw new TRPCError({ code: 'NOT_FOUND', message: "not a string" })
      return data;
    }),
});
