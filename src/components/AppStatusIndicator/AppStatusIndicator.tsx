import { SvgIconTypeMap } from "@mui/material";
import { CellTower } from "@mui/icons-material";
import React, { useEffect, useMemo, useState } from "react";
export const AppStatusIndicator = (props: SvgIconTypeMap["props"]) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOffline = () => {
      setIsOnline(false);
    };

    const handleOnline = () => {
      setIsOnline(true);
    };
    window.addEventListener("online", handleOnline);

    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  const iconColor = useMemo<SvgIconTypeMap["props"]["color"]>(
    () => (isOnline ? "success" : "warning"),
    [isOnline]
  );
  return (
    <>
      <CellTower color={iconColor} {...props} />
    </>
  );
};
