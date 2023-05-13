import { signIn, signOut, useSession } from "next-auth/react";
import { type FC } from "react";
import ProviderButtons from "./ProviderButtons";
import Button from "./Button";

const LoginUI: FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blueGray to-plum text-white">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl ">
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        </p>
        {!sessionData ? (
          <div className="flex flex-col">
            <ProviderButtons
              onClick={() => void signIn("google", { callbackUrl: "/" })}
              provider="google"
            />
            <ProviderButtons
              onClick={() => void signIn("discord", { callbackUrl: "/" })}
              provider="discord"
            />
          </div>
        ) : (
          <Button
            onClick={() => void signOut()}
            buttonColor="yellow"
            buttonSize="small"
          >
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoginUI;
