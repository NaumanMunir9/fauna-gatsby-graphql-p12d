// libraries
import React from "react";
import { Grid, TextField } from "@material-ui/core";

// components
import ButtonSubmit from "./ButtonSubmit";

export default function InputData({
  inputUrl,
  setInputUrl,
  inputDesc,
  setInputDesc,
  addBookmarkSubmit,
}) {
  return (
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
            fullWidth={true}
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
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonSubmit addBookmarkSubmit={addBookmarkSubmit} />
        </Grid>
      </Grid>
    </>
  );
}
