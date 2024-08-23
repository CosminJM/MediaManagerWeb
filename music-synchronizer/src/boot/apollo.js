import { boot } from "quasar/wrappers";
import store from "../store/index.js";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";

function createApolloClient(router, store) {
  const httpLink = new HttpLink({
    // !!! FOR DOCKER. I must use the port 9020 (current configuration) exposed by FRONTEND container to my localhost
    // because the browser talks from my machine to docker.
    uri: "http://localhost:9020/graphql",
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

  // Error link to handle errors globally
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        if (extensions && extensions.code === "AUTH_NOT_AUTHORIZED") {
          // Handle 401 Unauthorized error here
          console.log("Unauthorized access - Redirecting to login");
          store.dispatch("logout");
          router.push("/login");
        }
      });
    }

    if (networkError && networkError.statusCode === 401) {
      // Handle network 401 error
      console.log("Unauthorized access - Redirecting to login");
      store.dispatch("logout");
      router.push("/login");
    }
  });

  return new ApolloClient({
    link: ApolloLink.from([authMiddleware, errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
}

let apolloClient;

export default boot(({ app, router }) => {
  apolloClient = createApolloClient(router, store);

  app.config.globalProperties.$apollo = apolloClient;
});

export { apolloClient };
