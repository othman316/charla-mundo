import { type FC } from "react";
import NavigationBar from "./NavigationBar";

const Sidebar: FC = ({}) => {
  return (
    <div className="flex h-screen w-[5%] ">
      <NavigationBar />
    </div>
  );
};

export default Sidebar;
