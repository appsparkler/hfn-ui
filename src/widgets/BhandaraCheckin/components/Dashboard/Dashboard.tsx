import { Refresh } from "@mui/icons-material";
import {
  CircularProgress,
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
import { Horizontal, Vertical } from "components";
import { noop } from "lodash/fp";
import { useEffect, useMemo } from "react";
import { initialStats, maxWidth } from "widgets/BhandaraCheckin/constants";
import { DashboardProps } from "widgets/BhandaraCheckin/types";
import { uuidv4 } from "@firebase/util";

export const Dashboard = ({
  stats = initialStats,
  onRefresh = noop,
  onReturn = noop,
}: DashboardProps) => {
  const totalCheckins = useMemo(
    () =>
      (stats.abhyasiIdCheckin + stats.emailOrMobileCheckin).toLocaleString(),
    [stats.abhyasiIdCheckin, stats.emailOrMobileCheckin]
  );

  const emailOrMobileCheckinPercent = useMemo<string>(() => {
    const percent =
      (stats.emailOrMobileCheckin /
        (stats.abhyasiIdCheckin + stats.emailOrMobileCheckin)) *
      100;
    return `${percent.toFixed(2)}%`;
  }, [stats.abhyasiIdCheckin, stats.emailOrMobileCheckin]);

  const abhyasiIdCheckinPercent = useMemo<string>(() => {
    const percent =
      (stats.abhyasiIdCheckin /
        (stats.abhyasiIdCheckin + stats.emailOrMobileCheckin)) *
      100;
    return `${percent.toFixed(2)}%`;
  }, [stats.abhyasiIdCheckin, stats.emailOrMobileCheckin]);

  useEffect(onRefresh, [onRefresh]);

  const noData = useMemo(
    () => stats.abhyasiIdCheckin === 0 || stats.emailOrMobileCheckin === 0,
    [stats.abhyasiIdCheckin, stats.emailOrMobileCheckin]
  );

  return (
    <Vertical
      gap={2}
      width={"100%"}
      maxWidth={maxWidth}
      paddingX={1}
      marginX="auto"
    >
      <Horizontal
        alignItems={"center"}
        justifyContent="space-between"
        width="100%"
      >
        <Typography variant="h5" justifyContent={"center"} display="flex">
          <span>Dashboard</span>
        </Typography>
        <Horizontal alignItems={"center"}>
          <IconButton onClick={onReturn}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton onClick={onRefresh}>
            <Refresh />
          </IconButton>
        </Horizontal>
      </Horizontal>

      {noData ? (
        <Vertical alignItems={"center"} mt={5}>
          <CircularProgress />
        </Vertical>
      ) : (
        <>
          <Typography align="center" variant="overline">
            total checkins
          </Typography>
          <Typography align="center" variant="h1">
            {totalCheckins}
          </Typography>
          <Horizontal sx={{ width: "100%" }} justifyContent="space-between">
            <Vertical alignItems={"center"}>
              <Typography
                variant="overline"
                textAlign={"center"}
                align="center"
              >
                Abhyasi ID
              </Typography>
              <Typography align="center" variant="h3">
                {stats.abhyasiIdCheckin.toLocaleString()}
              </Typography>
              <Typography align="center" variant="h6">
                {abhyasiIdCheckinPercent}
              </Typography>
            </Vertical>
            <Vertical alignItems={"center"}>
              <Typography align="center" variant="overline">
                Email Or Mobile
              </Typography>
              <Typography align="center" variant="h3">
                {stats.emailOrMobileCheckin.toLocaleString()}
              </Typography>
              <Typography align="center" variant="h6">
                {emailOrMobileCheckinPercent}
              </Typography>
            </Vertical>
          </Horizontal>
          <Vertical gap={2}>
            <InfoTable title={"Country"} data={getSortedData(stats.country)} />
            <InfoTable title={"State"} data={getSortedData(stats.state)} />
            <InfoTable title={"City"} data={getSortedData(stats.city)} />
          </Vertical>
        </>
      )}
    </Vertical>
  );
};

// Sort an object with values as numbers with response of id, name and value
const getSortedData = (
  data: Record<string, number>
): { name: string; value: number; id: string }[] => {
  const sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]);
  return sortedData.map(([name, value]) => ({ name, value, id: uuidv4() }));
};

function InfoTable({
  title = "",
  data = [],
}: {
  title: string;
  data: { id: string; name: string; value: number }[];
}) {
  return (
    <TableContainer component={Paper} sx={{ p: 1 }}>
      <Typography variant="h4">{title}</Typography>
      <Table sx={{ width: "100%" }}>
        <TableBody>
          {data.map(({ name, value, id }, index) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell align="center">{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
