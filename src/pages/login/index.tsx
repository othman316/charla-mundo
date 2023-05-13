import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoginUI from "~/components/LoginUI";
import { type NextPageWithLayout } from "../_app";

const Login: NextPageWithLayout = ({}) => {
  const { data: sessionData } = useSession();
  const { push } = useRouter();
  if (sessionData?.user) {
    void (async () => await push("/"))();
  }
  return (
    <div>
      <LoginUI />
    </div>
  );
};

Login.getLayout = (page) => <>{page}</>;
export default Login;
