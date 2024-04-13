import { Button, ButtonProps } from "@mui/material";

export const ContainedButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      disableElevation
      type="button"
      variant="contained"
      size={"large"}
      {...props}
    >
      {props.children}
    </Button>
  );
};
