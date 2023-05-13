import { useSession } from "next-auth/react";
import { type FC } from "react";
import { type RouterOutputs } from "~/utils/api";
import UserImage from "./UserImage";
import { CgClose } from "react-icons/cg";
import { FiMoreVertical } from "react-icons/fi";

type participant =
  RouterOutputs["messages"]["getConversationsByUserId"][number]["participants"];
interface ConvoViewHeaderProps {
  participants: participant;
}

const ConvoViewHeader: FC<ConvoViewHeaderProps> = ({ participants }) => {
  const { data: sessionData } = useSession();
  const theOtherUser = participants.find(
    (participant) => participant.id !== sessionData?.user.id
  );

  console.log(theOtherUser);
  return (
    <div className=" flex max-h-[12%] min-h-[12%] w-full items-center justify-between  bg-plum align-middle">
      <div className="flex items-center pl-5 text-black">
        <CgClose className="cursor-pointer text-3xl" />
        <div className="gap- flex items-center gap-3 pl-10">
          <UserImage size={64} user={theOtherUser} />
          <div className="flex flex-col">
            <span className="font-bold text-black">{theOtherUser?.name}</span>
            <span className="text-xs font-normal text-gray-700">
              Last seen: 2 minutes ago
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 pr-5 text-black">
        <FiMoreVertical className="cursor-pointer text-3xl" />
      </div>
    </div>
  );
};

export default ConvoViewHeader;
