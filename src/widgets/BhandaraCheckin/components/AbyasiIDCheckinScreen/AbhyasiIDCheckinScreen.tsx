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
  batch,
  onChangeDormAndBerthAllocation,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <Vertical maxWidth={maxWidth} marginX="auto" gap={2}>
      <Card elevation={1}>
        <CardContent>
          <Typography variant="h4" color="goldenrod" align="center">
            Abhyasi ID
            <br />
            Checkin
          </Typography>
        </CardContent>
      </Card>
      <Card elevation={1}>
        <CardContent>
          <Vertical gap={1}>
            <Box>
              <Typography variant="subtitle2">
                <strong>Abhyasi ID:</strong> {abhyasiId}
              </Typography>
              <Typography variant="subtitle2">
                <strong>Batch:</strong> {batch}
              </Typography>
            </Box>
            <Box width="100%">
              <Typography variant="subtitle2">
                <strong>Dorm and Berth Allocation:</strong>
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Please enter allocated dorm and berth..."
                fullWidth
                inputRef={inputRef}
                onChange={onChangeDormAndBerthAllocation}
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
  );
};
