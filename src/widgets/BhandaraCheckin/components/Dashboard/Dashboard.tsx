import { Refresh } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CenterOfViewport, Horizontal } from "components";
import { noop } from "lodash/fp";
import { useEffect, useState } from "react";
import { maxWidth } from "widgets/BhandaraCheckin/constants";
import { DashboardProps } from "widgets/BhandaraCheckin/types";

export const Dashboard = ({
  total = 0,
  password = "",
  onMount = noop,
  onRefresh = noop,
  onReturn = noop,
}: DashboardProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const res = prompt();
    if (res === password) {
      setIsLoggedIn(true);
    }
  }, [password]);

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
        <Typography variant="h5">Dashboard</Typography>
        <Horizontal>
          <IconButton onClick={onReturn}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton onClick={onRefresh}>
            <Refresh />
          </IconButton>
        </Horizontal>
      </Horizontal>
      {isLoggedIn ? (
        <>
          <Typography align="center" variant="overline">
            total
          </Typography>
          <Typography align="center" variant="h1">
            {total.toLocaleString()}
          </Typography>
        </>
      ) : (
        <Typography color="warning.light">
          <i>Please login</i>
        </Typography>
      )}
    </CenterOfViewport>
  );
};
