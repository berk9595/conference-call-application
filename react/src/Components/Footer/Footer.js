import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";
import { SvgIcon } from "../SvgIcon";
import MicButton from "./Components/MicButton";
import CameraButton from "./Components/CameraButton";
import OptionButton from "./Components/OptionButton";
import ShareScreenButton from "./Components/ShareScreenButton";
import MessageButton from "./Components/MessageButton";
import EndCallButton from "./Components/EndCallButton";
import TimeZone from "./Components/TimeZone";
import { useParams } from "react-router-dom";

const CustomizedGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.green[80],
  position: "fixed",
  bottom: 0,
  left: 0,
  padding: 16,
  width: "100vw",
  zIndex: 2,
  height: 80,
}));
function Footer(props) {
  const { id } = useParams();

  return (
    <CustomizedGrid
      container
      alignItems={"center"}
      justifyContent={{ xs: "center", sm: "space-between" }}
    >
      <Grid item sx={{ display: { xs: "none", sm: "block" } }}>
        <Grid container alignItems={"center"}>
          <SvgIcon size={56} name={"ant-media-light"} color="white" />
          <Typography color="#ffffff" variant="h6">
            {id}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          justifyContent="center"
          columnSpacing={{ xs: 1, sm: 2 }}
        >
          <Grid item xs={2}>
            <OptionButton footer />
          </Grid>
          <Grid item xs={2}>
            <CameraButton {...props} footer />
          </Grid>
          <Grid item xs={2}>
            <MicButton footer />
          </Grid>
          <Grid item xs={2}>
            {" "}
            <ShareScreenButton footer />
          </Grid>
          <Grid item xs={2}>
            <MessageButton footer />
          </Grid>
          <Grid item xs={2}>
            <EndCallButton footer />
          </Grid>
        </Grid>
      </Grid>

      <Grid item sx={{ display: { xs: "none", sm: "block" } }}>
        <TimeZone />
      </Grid>
    </CustomizedGrid>
  );
}

export default Footer;
