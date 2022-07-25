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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CenterOfViewport, Horizontal, Vertical } from "components";
import { noop } from "lodash/fp";
import { useCallback, useEffect, useMemo, useState } from "react";
import { maxWidth } from "widgets/BhandaraCheckin/constants";
import {
  DashboardProps,
  DashboardV0Props,
} from "widgets/BhandaraCheckin/types";

export const Dashboard = ({
  stats,
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
      <Typography align="center" variant="overline">
        total checkins
      </Typography>
      <Typography align="center" variant="h1">
        {totalCheckins}
      </Typography>
      <Horizontal sx={{ width: "100%" }} justifyContent="space-between">
        <Vertical alignItems={"center"}>
          <Typography variant="overline" textAlign={"center"} align="center">
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
      <TableContainer component={Paper} sx={{ p: 1 }}>
        <Typography variant="h4">State</Typography>
        <Table sx={{ width: "100%" }}>
          <TableBody>
            <TableRow>
              <TableCell>Andhra Pradesh</TableCell>
              <TableCell align="center">10</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </CenterOfViewport>
  );
};
