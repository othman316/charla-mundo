import { type SetStateAction, type FC, type Dispatch } from "react";
import { type RouterOutputs, api } from "~/utils/api";
import LoadingSpinner from "./LoadingSpinner";
import { useSession } from "next-auth/react";
import { getRelativeTime } from "~/server/helpers/getRelativeTime";
import UserImage from "./UserImage";
type conversationType =
  RouterOutputs["messages"]["getConversationsByUserId"][number];

interface ConvoListProps {
  setCurrentConvo: Dispatch<
    SetStateAction<conversationType | undefined | null>
  >;
}

const ConvoList: FC<ConvoListProps> = ({ setCurrentConvo }) => {
  const { data: conversations, isLoading: conversationsLoading } =
    api.messages.getConversationsByUserId.useQuery();
  if (conversationsLoading) return <LoadingSpinner />;
  if (!conversations) return <div>No Data!</div>;
  return (
    <div className=" flex h-screen w-[28%] min-w-[28%] max-w-[28%] flex-col gap-3 overflow-y-scroll px-4 py-4">
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
          <ConvoInAList
            setCurrentConvo={setCurrentConvo}
            key={conversation.id}
            conversation={conversation}
          />
        );
      })}
    </div>
  );
};

interface ConvoInAListProps {
  conversation: conversationType;
  setCurrentConvo: Dispatch<
    SetStateAction<conversationType | undefined | null>
  >;
}

const ConvoInAList: FC<ConvoInAListProps> = ({
  setCurrentConvo,
  conversation,
}) => {
  const { data: sessionData } = useSession();
  const theOtherUser = conversation.participants.find(
    (participant) => participant.id !== sessionData?.user.id
  );
  if (!theOtherUser) return <>User Not Found</>;

  return (
    <div
      onClick={() => setCurrentConvo(conversation)}
      className="w-full cursor-pointer rounded-lg bg-customGreen p-4 text-gray-900 shadow"
    >
      <div className="flex items-center">
        <div className="relative inline-block shrink-0">
          {theOtherUser.image && theOtherUser.name && (
            <UserImage user={theOtherUser} />
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
