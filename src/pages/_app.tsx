import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql/",
  cache: new InMemoryCache(),
});

export default function Home({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </div>
  );
}
