import { type FC } from "react";
import { type RouterOutputs, api } from "~/utils/api";
import LoadingSpinner from "./LoadingSpinner";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getRelativeTime } from "~/server/helpers/getRelativeTime";

const ConvoList: FC = ({}) => {
  const { data: conversations, isLoading: conversationsLoading } =
    api.messages.getConversationsByUserId.useQuery();
  if (conversationsLoading) return <LoadingSpinner />;
  if (!conversations) return <div>No Data!</div>;
  return (
    <div className="flex h-screen w-[100%] flex-col gap-3 overflow-y-scroll px-5 ">
      {[
        ...conversations,
        ...conversations,
        ...conversations,
        ...conversations,
        ...conversations,
        ...conversations,
        ...conversations,
        ...conversations,
        ...conversations,
      ].map((conversation) => {
        return (
          <ConvoInAList key={conversation.id} conversation={conversation} />
        );
      })}
    </div>
  );
};

type conversationType =
  RouterOutputs["messages"]["getConversationsByUserId"][number];
interface ConvoInAListProps {
  conversation: conversationType;
}

const ConvoInAList: FC<ConvoInAListProps> = ({ conversation }) => {
  const { data: sessionData } = useSession();
  const theOtherUser = conversation.participants.find(
    (participant) => participant.id !== sessionData?.user.id
  );
  if (!theOtherUser) return <>User Not Found</>;

  return (
    <div className="w-full  rounded-lg bg-customGreen p-4 text-gray-900 shadow">
      <div className="flex items-center">
        <div className="relative inline-block shrink-0">
          {theOtherUser.image && theOtherUser.name && (
            <Image
              className="h-12 w-12 rounded-full"
              src={theOtherUser.image}
              alt={`${theOtherUser.name}'s profile picture`}
              height={36}
              width={36}
            />
          )}
        </div>
        <div className="ml-3 w-full text-sm font-normal">
          <div className="flex items-center justify-between text-sm font-semibold text-gray-900">
            <div>{theOtherUser.name}</div>
            <span className="text-xs font-thin text-blue-600 ">
              {conversation.Message[0]?.createdAt &&
                getRelativeTime(conversation.Message[0].createdAt)}
            </span>
          </div>
          <div className="text-sm font-normal">
            {conversation.Message[0]?.sender.id === sessionData?.user.id
              ? "You"
              : conversation.Message[0]?.sender.name}
            <span>: </span>
            {conversation.Message[0]?.content.slice(0, 59).concat("...")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvoList;
