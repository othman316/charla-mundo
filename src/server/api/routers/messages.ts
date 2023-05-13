import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";

import {
  createTRPCRouter,
} from "~/server/api/trpc";

export const messagesRouter = createTRPCRouter({

  getConversationsByUserId: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id
    const conversations = await ctx.prisma.conversation.findMany({ include: { Message: { orderBy: { createdAt: 'desc' }, take: 5, include: { sender: true } }, participants: true }, where: { participants: { some: { id: { equals: userId } } } } })
    return conversations

  }),
  sendMessageToConversation: protectedProcedure.input(z.object({ message: z.string(), conversationId: z.string() })).mutation(async ({ ctx, input }) => {
    const senderId = ctx.session.user.id
    const { message, conversationId } = input
    await ctx.prisma.message.create({ data: { content: message, conversationId: conversationId, senderId } })

  })
});
