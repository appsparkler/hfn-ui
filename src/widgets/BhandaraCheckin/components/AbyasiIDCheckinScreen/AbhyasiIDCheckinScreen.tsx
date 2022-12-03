import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { CenterOfViewport, Horizontal, Vertical } from "components";
import { TAbhyasiIDCheckinTileComponentProps } from "widgets/BhandaraCheckin/types/screens";

export const AbhyasiIDCheckinScreen: TAbhyasiIDCheckinTileComponentProps = ({
  onCheckin,
  onCancel,
  abhyasiId,
  onChangeDormAndBirthAllocation,
}) => {
  return (
    <CenterOfViewport>
      <Box width="100%" p={2}>
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
      </Box>
    </CenterOfViewport>
  );
};
