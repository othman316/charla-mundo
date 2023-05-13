import { type ReactNode, type FC } from "react";
import Button from "./Button";

const LoginLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Button>Login Layout</Button>
      <div>{children}</div>
    </div>
  );
};

export default LoginLayout;
