import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Horizontal, Vertical } from "components";
import { noop } from "lodash/fp";
import React from "react";

const maxWidth = 420;
export const HomeScreen: React.FC<{}> = () => {
  return (
    <Vertical mx="auto" justifyContent={"center"} alignItems={"center"}>
      <Card sx={{ m: 2, maxWidth: maxWidth, opacity: 0.86 }}>
        <CardContent>
          <Vertical alignItems={"center"} gap={2}>
            <img src={"image.webp"} alt={""} width="100%" />
            <Typography variant="h5" align="center">
              Global Spirituality Mahotsav
            </Typography>
            <TextField
              type="text"
              label="Name"
              name="name"
              variant="standard"
              required
              autoComplete="off"
              helperText={"Please enter name as displayed on the ID card"}
              fullWidth
            />
            <TextField
              type="tel"
              name="mobile"
              label="Mobile No."
              variant="standard"
              fullWidth
              autoComplete="off"
            />
            <TextField
              type="email"
              label="Email"
              name="email"
              variant="standard"
              fullWidth
              autoComplete="off"
            />
            <TextField
              type="text"
              label="Organization"
              name="organization"
              variant="standard"
              fullWidth
              autoComplete="off"
            />

            <Horizontal gap={1}>
              {/* <AsyncButton
                type="button"
                onClick={handleClickStart}
                disabled={!isStartButtonEnabled}
                isProcessing={isProcessing}
                size="large"
              >
                START CHECK IN
              </AsyncButton> */}
              {/* <AsyncButton
                color="warning"
                startIcon={<BarcodeSVG />}
                disabled={scanBtnProcessing || scanBtnDisabled}
                isProcessing={scanBtnProcessing}
                onClick={onClickScan}
                size="large"
                endIcon={<QrCode2 fontSize="medium" />}
              ></AsyncButton> */}
            </Horizontal>

            <Vertical>
              <FormControlLabel
                control={
                  <Switch checked={false} disabled={false} onChange={noop} />
                }
                label="Scanner"
              />
            </Vertical>
            <Box position="fixed" right={0} top={0}>
              <Horizontal alignItems={"center"}>
                {/* <ModeSwitch checked={false} onSwitch={onSwitchMode} /> */}
                {/* <CustomMenu
                  onClickDashboard={onClickDashboard}
                  onRefreshApp={onRefresh}
                /> */}
              </Horizontal>
            </Box>
          </Vertical>
        </CardContent>
      </Card>
    </Vertical>
  );
};
