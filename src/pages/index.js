// libraries
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import {
  CssBaseline,
  Container,
  Typography,
  Button,
  Grid,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Home() {
  const classes = useStyles();
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
      <CssBaseline />
      <Container maxWidth="md">
        <Typography component="div" style={{ backgroundColor: "#f5f5f5" }}>
          <div>
            {data &&
              data.bookmark.map((item) => (
                <div key={item.id}>
                  <h2>{item.url}</h2>
                  <h2>{item.desc}</h2>
                </div>
              ))}
          </div>

          <>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  placeholder="Enter URL"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  label="Enter URL"
                  variant="outlined"
                  fullWidth="true"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  placeholder="Enter Description"
                  value={inputDesc}
                  onChange={(e) => setInputDesc(e.target.value)}
                  label="Enter Description"
                  variant="outlined"
                  fullWidth="true"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={addBookmarkSubmit}
                  variant="contained"
                  color="primary"
                  fullWidth="true"
                >
                  Add Bookmark
                </Button>
              </Grid>
            </Grid>
          </>
        </Typography>
      </Container>
    </>
  );
}
