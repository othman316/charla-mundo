import Image from "next/image";
import { type FC } from "react";
import { type RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";
import UserImage from "./UserImage";

dayjs.extend(relativeTime); // use plugin

type messageType =
  RouterOutputs["messages"]["getConversationsByUserId"][number]["Message"][number];
interface MessageProps {
  message: messageType;
}

const Message: FC<MessageProps> = ({ message }) => {
  const { data: session } = useSession();
  return (
    <div
      className={`flex items-center space-x-4 ${
        session?.user.id === message.sender.id ? "justify-end" : ""
      } `}
    >
      {message.sender?.image && <UserImage size={42} user={message.sender} />}
      <div className="font-medium">
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
        <div className="max-w-[20%] text-sm font-thin">{message.content}</div>
      </div>
    </div>
  );
};

export default Message;
