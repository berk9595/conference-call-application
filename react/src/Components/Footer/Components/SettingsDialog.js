import * as React from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { MediaSettingsContext } from "../../../pages/AntMedia";
import { AntmediaContext } from "../../../App";
import { Grid, Hidden, MenuItem, useMediaQuery } from "@mui/material";
import { SvgIcon } from "Components/SvgIcon";
import { useTheme } from "@mui/material";
import { useTranslation } from 'react-i18next';

const AntDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle {...other}>
      {children}
      {onClose ? (
        <Button
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 26,
            top: 27,
          }}
        >
          <SvgIcon size={30} name={"close"} color={"white"} />
        </Button>
      ) : null}
    </DialogTitle>
  );
};

export function SettingsDialog(props) {
  const { t } = useTranslation();
  const { onClose, selectedValue, open, selectFocus } = props;
  const { devices, myLocalData } = React.useContext(MediaSettingsContext);
  const [selectedCamera, setSelectedCamera] = React.useState(null);
  const [selectedMicrophone, setSelectedMicrophone] = React.useState(null);

  const antmedia = React.useContext(AntmediaContext);


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClose = (event, reason) => {
    onClose(selectedValue);
  };
  function switchVideoMode(value) {
    setSelectedCamera(value);
    antmedia.switchVideoCameraCapture(myLocalData?.streamId, value);
  }

  function switchAudioMode(value) {
    setSelectedMicrophone(value);
    antmedia.switchAudioInputSource(myLocalData?.streamId, value);
  }
  React.useEffect(() => {
    if (devices) {
      const camera = devices.find((d) => d.kind === "videoinput");
      const audio = devices.find((d) => d.kind === "audioinput");
      if (camera) setSelectedCamera(camera.deviceId);
      if (audio) setSelectedMicrophone(audio.deviceId);
    }
  }, [devices]);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullScreen={fullScreen}
      maxWidth={"sm"}
    >
      <AntDialogTitle onClose={handleClose}>
        {t('Set Camera and Microphone')}
      </AntDialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
          <Grid container>
            <Grid container>
              <InputLabel>{t('Camera')}</InputLabel>
            </Grid>
            <Grid container alignItems={"center"} spacing={2}>
              <Grid item xs={10}>
                <Select
                  autoFocus={selectFocus === "camera"}
                  fullWidth
                  id="demo-dialog-native"
                  variant="outlined"
                  value={selectedCamera}
                  onChange={(e) => switchVideoMode(e.target.value)}
                  sx={{ color: "white" }}
                >
                  {devices
                    .filter((device) => device.kind === "videoinput")
                    .map((device) => (
                      <MenuItem key={device.deviceId} value={device.deviceId}>
                        {device.label}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
              <Hidden xsDown>
                <Grid item>
                  <SvgIcon size={30} name={"camera"} color={"white"} />
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 4 }}>
            <Grid container>
              <InputLabel>{t('Microphone')}</InputLabel>
            </Grid>
            <Grid container alignItems={"center"} spacing={2}>
              <Grid item xs={10}>
                <Select
                  autoFocus={selectFocus === "audio"}
                  variant="outlined"
                  fullWidth
                  value={selectedMicrophone}
                  onChange={(e) => switchAudioMode(e.target.value)}
                  sx={{ color: "white" }}
                >
                  {devices
                    .filter((device) => device.kind === "audioinput")
                    .map((device) => (
                      <MenuItem key={device.deviceId} value={device.deviceId}>
                        {device.label}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
              <Hidden xsDown>
                <Grid item>
                  <SvgIcon size={36} name={"microphone"} color={"white"} />
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

SettingsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
