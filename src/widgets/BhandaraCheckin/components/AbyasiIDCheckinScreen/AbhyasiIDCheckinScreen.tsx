import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Horizontal, Vertical } from "components";
import { useEffect, useRef } from "react";
import { maxWidth } from "widgets/BhandaraCheckin/constants";
import { TAbhyasiIDCheckinScreenComponentProps } from "widgets/BhandaraCheckin/types/screens";

export const AbhyasiIDCheckinScreen: TAbhyasiIDCheckinScreenComponentProps = ({
  onCheckin,
  onCancel,
  abhyasiId,
  onChangeDormAndBirthAllocation,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <Vertical maxWidth={maxWidth} marginX="auto">
      <Vertical gap={2}>
        <Box
          boxShadow="0px 2px 5px black"
          zIndex={2000}
          position="sticky"
          top={0}
          p={1}
          sx={{ backgroundColor: "background.paper" }}
        >
          <Typography align="center" variant="h6" py="2">
            Abhyasi ID Checkin
          </Typography>
        </Box>
        <Card elevation={1}>
          <CardContent>
            <Vertical gap={1}>
              <Box>
                <Typography variant="subtitle2">Abhyasi ID:</Typography>
                <Typography variant="body2" color="text.secondary">
                  {abhyasiId}
                </Typography>
              </Box>
              <Box width="100%">
                <Typography variant="subtitle2">
                  Dorm and Birth Allocation:
                </Typography>
                <TextField
                  variant="outlined"
                  placeholder="Please enter allocated dorm and birth..."
                  fullWidth
                  inputRef={inputRef}
                  onChange={onChangeDormAndBirthAllocation}
                />
              </Box>
            </Vertical>
            <Horizontal
              justifyContent={"space-around"}
              alignItems="center"
              mt={2}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={onCancel}
                size={"large"}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onCheckin}
              >
                Checkin
              </Button>
            </Horizontal>
          </CardContent>
        </Card>
      </Vertical>
    </Vertical>
  );
};
