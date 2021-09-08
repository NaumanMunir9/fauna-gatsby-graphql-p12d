import React from "react";

export default function BookmarkData({ data }) {
  return (
    <>
      {data &&
        data.bookmark.map((item) => (
          <div key={item.id}>
            <h2>{item.url}</h2>
            <h2>{item.desc}</h2>
          </div>
        ))}
    </>
  );
}
