import Image from "next/image";
import { type FC } from "react";
import { type RouterOutputs } from "~/utils/api";

import type { User as NextAuthUser } from "next-auth";

type User =
  RouterOutputs["messages"]["getConversationsByUserId"][number]["participants"][number];

interface UserImageProps {
  size?: number;
  user: User | NextAuthUser | undefined;
  className?: string;
}

const UserImage: FC<UserImageProps> = ({ size, user, className }) => {
  return (
    <>
      {user?.image && user.name && (
        <Image
          className={`rounded-full ${className || ""}`}
          src={user.image}
          alt={`${user.name ?? ""}'s profile picture`}
          width={size || 42}
          height={size || 42}
        />
      )}
    </>
  );
};

export default UserImage;
