import React from "react";
import { Avatar, Grid } from "@mui/material";
import defaultAvatar from "../../static/images/defaultAvatar.png";
function DummyCard() {
  return (
    <Grid
      container
      style={{
        background: "var(--green-70)",
        borderRadius: 4,
        height: "100%",
      }}
      justifyContent="center"
      alignItems={"center"}
    >
      <Avatar src={defaultAvatar} style={{ width: 80, height: 80 }} />{" "}
    </Grid>
  );
}

export default DummyCard;
