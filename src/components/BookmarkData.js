// libraries
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  ListItemText,
  Divider,
  ListItem,
  List,
} from "@material-ui/core";

// material-ui styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function BookmarkData({ data }) {
  const classes = useStyles();

  return (
    <>
      {data &&
        data.bookmark.map((item) => (
          <List key={item.id} className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemText
                fullWidth="true"
                primary={`Description: ${item.desc}`}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      URL:{" "}
                    </Typography>
                    {item.url}
                  </>
                }
              />
            </ListItem>
            <Divider variant="middle" component="li" />
          </List>
        ))}
    </>
  );
}
