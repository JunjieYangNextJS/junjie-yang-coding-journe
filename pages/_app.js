import "../styles/globals.css";
import { Provider as AuthProvider } from "next-auth/client";
import { SelectedNavProvider } from "./../contexts/SelectedNavContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <SelectedNavProvider>
        {" "}
        <Component {...pageProps} />
      </SelectedNavProvider>
    </AuthProvider>
  );
}

export default MyApp;
