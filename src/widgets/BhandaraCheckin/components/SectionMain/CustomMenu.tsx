import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { noop } from "lodash/fp";
import { CustomMenuProps } from "widgets/BhandaraCheckin/types";

const ITEM_HEIGHT = 48;

export const CustomMenu = ({ onRefreshApp = noop }: CustomMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = React.useCallback<(fn?: Function) => any>(
    (fn) => () => {
      setAnchorEl(null);
      if (fn) fn();
    },
    []
  );

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose()}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
          },
        }}
      >
        <MenuItem onClick={handleClose(onRefreshApp)}>Refresh App</MenuItem>
      </Menu>
    </div>
  );
};
