// libraries
import React, { useState } from "react";
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
  const [inputUrl, setInputUrl] = useState("");
  const [inputDesc, setInputDesc] = useState("");

  const { loading, error, data } = useQuery(BookmarkQuery);

  const addBookmarkSubmit = () => {
    console.log(inputUrl);
  };

  return (
    <div>
      <p>{JSON.stringify(data)}</p>

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
