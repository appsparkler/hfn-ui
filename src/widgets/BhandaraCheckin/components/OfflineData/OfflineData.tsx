import { Refresh } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Horizontal, Vertical } from "components";
import { noop } from "lodash/fp";
import { useEffect, useMemo } from "react";
import { OfflineDataProps } from "widgets/BhandaraCheckin/types/components/OfflineData";

export const OfflineData = ({
  data = [],
  onMount = noop,
  onRefresh,
}: OfflineDataProps) => {
  const hasData = useMemo(() => data.length, [data]);
  useEffect(() => {
    onMount();
  }, [onMount]);

  return (
    <Vertical gap={2} p={1}>
      <Horizontal alignItems={"center"} justifyContent="space-between">
        <Typography variant="h5">Offline Checkins</Typography>
        {hasData ? (
          <IconButton onClick={onRefresh}>
            <Refresh />
          </IconButton>
        ) : null}
      </Horizontal>
      {hasData ? (
        <Box>
          <TableContainer component={Paper}>
            <Table stickyHeader>
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
        </Box>
      ) : (
        <Typography align="center" py={3}>
          <i>All checkins are synced.</i>
        </Typography>
      )}
    </Vertical>
  );
};
