// libraries
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";

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

  console.log(data.bookmark);

  return (
    <div>
      <div>
        {data &&
          data.bookmark.map((item) => (
            <div key={item.id}>
              <h2>{item.url}</h2>
              <h2>{item.desc}</h2>
            </div>
          ))}
      </div>

      <div>
        <div>
          <input
            type="text"
            placeholder="Enter URL"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter Description"
            value={inputDesc}
            onChange={(e) => setInputDesc(e.target.value)}
          />
        </div>

        <div>
          <button onClick={addBookmarkSubmit}>Add Bookmark</button>
        </div>
      </div>
    </div>
  );
}
