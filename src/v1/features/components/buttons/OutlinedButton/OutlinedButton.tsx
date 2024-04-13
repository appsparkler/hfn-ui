import { Button, ButtonProps } from "@mui/material";

export const OutlinedButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      disableElevation
      type="button"
      variant="outlined"
      size={"large"}
      {...props}
    >
      {props.children}
    </Button>
  );
};
