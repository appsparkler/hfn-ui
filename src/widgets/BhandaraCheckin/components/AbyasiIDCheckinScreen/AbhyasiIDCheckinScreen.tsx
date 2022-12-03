import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { CenterOfViewport, Horizontal, Vertical } from "components";

export interface IAbhyasiIDCheckinTileStateProps {
  abhyasiId: string;
}

export interface IAbhyasiIDCheckinTileDispatchProps {
  onCheckin: () => void;
  onCancel: () => void;
}

export type TAbhyasiIDCheckinTileProps = IAbhyasiIDCheckinTileStateProps &
  IAbhyasiIDCheckinTileDispatchProps;

export type TAbhyasiIDCheckinTileComponentProps =
  React.FC<TAbhyasiIDCheckinTileProps>;

export const AbhyasiIDCheckinTile: TAbhyasiIDCheckinTileComponentProps = ({
  abhyasiId,
  onCheckin,
  onCancel,
}) => {
  return (
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
                onChange={console.log}
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
  );
};

export const AbhyasiIDCheckinScreen = ({}) => {
  return (
    <CenterOfViewport>
      <AbhyasiIDCheckinTile
        abhyasiId=""
        onCancel={console.log}
        onCheckin={console.log}
      />
    </CenterOfViewport>
  );
};
