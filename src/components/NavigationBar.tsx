import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { type FC } from "react";
import { SiTheconversation } from "react-icons/si";
import { FaUserFriends, FaSignOutAlt } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { useRouter } from "next/router";
import UserImage from "./UserImage";

const NavigationBar: FC = ({}) => {
  const { data: session } = useSession();
  const { pathname } = useRouter();

  return (
    <div className="max-w[5%] flex h-screen max-h-screen w-[5%] min-w-[5%] flex-col items-center justify-between bg-gradient-to-b from-blueGray to-plum px-2 py-5">
      <div className="">
        <div className="">
          {session?.user.image && (
            <UserImage
              size={42}
              user={session.user}
              className={"rounded-full border-2 border-customGreen"}
            />
          )}
        </div>
        <div className="mt-20 flex flex-col items-center gap-12">
          <div className="">
            <Link href={"/"} className="">
              <SiTheconversation
                className={`text-[32px] ${
                  pathname === "/" ? "fill-customGreen" : ""
                } hover:fill-customGreen`}
              />
            </Link>
          </div>
          <div className="">
            <Link href="/friends">
              <FaUserFriends
                className={`text-[32px] ${
                  pathname === "/friends" ? "fill-customGreen" : ""
                } hover:fill-customGreen `}
              />
            </Link>
          </div>
          <div
            className={`text-[32px] ${
              pathname === "/friends" ? "fill-customGreen" : ""
            } hover:fill-customGreen`}
          >
            <Link href="/settings">
              <MdSettings
                className={`text-[32px] ${
                  pathname === "/settings" ? "fill-customGreen" : ""
                } hover:fill-customGreen`}
              />
            </Link>
          </div>
        </div>
      </div>
      <div
        onClick={() => void signOut({ redirect: true, callbackUrl: "/login" })}
        className="cursor-pointer "
      >
        <FaSignOutAlt className="flex text-[32px] hover:fill-customGreen" />
      </div>
    </div>
  );
};

export default NavigationBar;
