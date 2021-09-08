// libraries
import React from "react";
import { Button } from "@material-ui/core";

export default function ButtonSubmit({ addBookmarkSubmit }) {
  return (
    <>
      <Button
        onClick={addBookmarkSubmit}
        variant="contained"
        color="primary"
        fullWidth={true}
      >
        Add Bookmark
      </Button>
    </>
  );
}
