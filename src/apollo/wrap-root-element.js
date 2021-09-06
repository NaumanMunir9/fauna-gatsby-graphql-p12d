// libraries
import React from "react";
import { ApolloProvider } from "@apollo/client";

// client
import { client } from "./client";

export const wrapRootElement = ({ element }) => {
  <ApolloProvider client={client}>{element}</ApolloProvider>;
};
