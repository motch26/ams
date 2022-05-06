import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Folder, Grade } from "@mui/icons-material";

function AreaDrawers({ openList, toggleDrawer, openRating }) {
  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <List>
        {[
          "Area 1",
          "Area 2",
          "Area 3",
          "Area 4",
          "Area 5",
          "Area 6",
          "Area 7",
          "Area 8",
          "Area 9",
          "Area 10",
        ].map((text, index) => (
          <ListItem button key={index} onClick={openList}>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={openRating}>
          <ListItemIcon>
            <Grade />
          </ListItemIcon>
          <ListItemText primary="Ratings" />
        </ListItem>
      </List>
    </Box>
  );
}

export default AreaDrawers;
