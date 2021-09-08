// libraries
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Container, Typography } from "@material-ui/core";

// components
import BookmarkData from "../components/BookmarkData";
import InputForm from "../components/InputForm";

// styles
import "./index.css";

const BookmarkQuery = gql`
  query {
    bookmark {
      id
      url
      desc
    }
  }
`;

const AddBookmarkMutation = gql`
  mutation addBookmark($url: String!, $desc: String!) {
    addBookmark(url: $url, desc: $desc) {
      id
      url
      desc
    }
  }
`;

export default function Home() {
  const [inputUrl, setInputUrl] = useState("");
  const [inputDesc, setInputDesc] = useState("");

  const { loading, error, data } = useQuery(BookmarkQuery);

  const [addBookmark] = useMutation(AddBookmarkMutation);

  const addBookmarkSubmit = () => {
    addBookmark({
      variables: {
        url: inputUrl,
        desc: inputDesc,
      },
      refetchQueries: [{ query: BookmarkQuery }],
    });
  };

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>{`Error: ${error.message}`}</h3>;

  return (
    <>
      <Container maxWidth="md" style={{ paddingTop: "20px", margin: "auto" }}>
        <Typography component="div">
          <BookmarkData data={data} />

          <InputForm
            inputUrl={inputUrl}
            inputDesc={inputDesc}
            setInputUrl={setInputUrl}
            setInputDesc={setInputDesc}
            addBookmarkSubmit={addBookmarkSubmit}
          />
        </Typography>
      </Container>
    </>
  );
}
