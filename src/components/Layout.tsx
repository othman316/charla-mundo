import { type ReactNode, type FC } from "react";
import NavigationBar from "./NavigationBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <NavigationBar />
      {children}
    </div>
  );
};

export default Layout;
