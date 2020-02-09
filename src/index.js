import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Context from "./Context";

import { App } from "./App";

const client = new ApolloClient({
  uri: "https://petgram-server-santiagoprieto-dm3pfhuwh.now.sh/graphql",
  request: operation => {
    const token = sessionStorage.getItem("token");
    const authorization = token ? `bearer ${token}` : "";
    operation.setContext({
      headers: {
        authorization
      }
    });
  },
  onError: error => {
    const { networkError } = error;
    if (networkError && networkError.result.code === "invalid_token") {
      sessionStorage.removeItem("token");
      window.location.href = "/";
    }
  }
});

ReactDOM.render(
  <Context.Provider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Context.Provider>,
  document.getElementById("app")
);
