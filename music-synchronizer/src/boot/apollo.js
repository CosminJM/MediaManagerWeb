import { boot } from "quasar/wrappers";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client/core";

// Replace this with your GraphQL endpoint
const httpLink = new HttpLink({
  uri: "http://localhost:5013/graphql",
});

// Middleware to add the Bearer token to the request headers
const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token") || "";

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export default boot(({ app }) => {
  app.config.globalProperties.$apollo = apolloClient;
});

export { apolloClient };
