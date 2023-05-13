import Image from "next/image";
import { type FC } from "react";
import { type RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";

dayjs.extend(relativeTime); // use plugin

type messageType =
  RouterOutputs["messages"]["getConversationsByUserId"][number]["Message"][number];
interface MessageProps {
  message: messageType;
}

const Message: FC<MessageProps> = ({ message }) => {
  const { data: session } = useSession();
  return (
    <div className="flex w-[60%] items-center space-x-4 ">
      {message.sender?.image && (
        <Image
          className="h-10 w-10 rounded-full"
          src={message.sender.image}
          alt={`${message.sender.name ?? ""}'s profile picture`}
          width={32}
          height={32}
        />
      )}
      <div className="font-medium dark:text-white">
        <div className="flex flex-row content-evenly gap-1">
          <span>
            {session?.user.id === message.sender.id
              ? "You"
              : message.sender.name}
          </span>
          <span className="self-center text-xs font-thin">
            · {dayjs(message.createdAt).fromNow()}
          </span>
        </div>
        <div className="text-sm font-thin">{message.content}</div>
      </div>
    </div>
  );
};

export default Message;
