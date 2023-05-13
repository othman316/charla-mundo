import { type FC } from "react";

import { type RouterOutputs } from "~/utils/api";
import Message from "./Message";
import ChatInput from "./ChatInput";
import ConvoViewHeader from "./ConvoViewHeader";
type conversationWithMsgs =
  RouterOutputs["messages"]["getConversationsByUserId"][number];

interface ConvoViewProps {
  conversation: conversationWithMsgs;
}
const ConvoView: FC<ConvoViewProps> = ({ conversation }) => {
  return (
    <div className="flex h-screen flex-col items-center gap-4">
      <ConvoViewHeader participants={conversation.participants} />
      <div className="flex flex-col gap-5 overflow-auto">
        {conversation.Message.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </div>
      <ChatInput conversationId={conversation.id} />
    </div>
  );
};

export default ConvoView;
