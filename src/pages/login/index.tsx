import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoginUI from "~/components/LoginUI";
import { type NextPageWithLayout } from "../_app";
import { useEffect } from "react";

const Login: NextPageWithLayout = ({}) => {
  const { data: sessionData } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (sessionData?.user) {
      void (async () => await push("/"))();
    }
  }, [push, sessionData]);

  return (
    <div>
      <LoginUI />
    </div>
  );
};

Login.getLayout = (page) => <>{page}</>;
export default Login;
