import { type AppProps, type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { type NextComponentType, type NextPage } from "next";
import { type ReactNode, type ReactElement } from "react";
import Layout from "~/components/Layout";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface AppPageProps {
  // whatever additional page props you want
  session: Session | null;
}
type CustomAppProps = AppProps<AppPageProps> & {
  // whatever additional component types you want
  Component: NextComponentType & NextPageWithLayout;
};
const MyApp: AppType<AppPageProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) => {
  const getLayoutIfExists =
    Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return (
    <SessionProvider session={session}>
      {getLayoutIfExists(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
