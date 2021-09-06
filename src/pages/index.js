// libraries
import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const BookmarkQuery = gql`
  {
    bookmark {
      id
      url
      desc
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(BookmarkQuery);

  console.log(data);

  return (
    <div>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
