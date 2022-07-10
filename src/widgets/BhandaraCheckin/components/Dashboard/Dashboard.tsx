import { Refresh } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CenterOfViewport, Horizontal } from "components";
import { noop } from "lodash/fp";
import { useEffect, useMemo } from "react";
import { OfflineDataProps } from "widgets/BhandaraCheckin/types/components/OfflineData";
import { maxWidth } from "widgets/BhandaraCheckin/constants";

export const OfflineData = ({
  data = [],
  onMount = noop,
  onRefresh = noop,
  onReturn = noop,
}: OfflineDataProps) => {
  const hasData = useMemo(() => data.length, [data]);
  useEffect(() => {
    onMount();
  }, [onMount]);

  return (
    <CenterOfViewport
      gap={2}
      width={"100%"}
      maxWidth={maxWidth}
      paddingX={1}
      justifyContent="initial"
    >
      <Horizontal
        alignItems={"center"}
        justifyContent="space-between"
        width="100%"
      >
        <Typography variant="h5">Offline Checkins</Typography>
        <Horizontal>
          <IconButton onClick={onReturn}>
            <ArrowBackIcon />
          </IconButton>
          {hasData ? (
            <IconButton onClick={onRefresh}>
              <Refresh />
            </IconButton>
          ) : null}
        </Horizontal>
      </Horizontal>
      {hasData ? (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {data.map(({ id, info }) => {
                return (
                  <TableRow key={id}>
                    <TableCell>{info}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center" py={3}>
          <i>All checkins are synced.</i>
        </Typography>
      )}
    </CenterOfViewport>
  );
};
