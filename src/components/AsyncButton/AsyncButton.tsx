import { Button, ButtonProps, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

export type AsyncButtonProps = ButtonProps & {
  isProcessing?: boolean;
  label: string;
};

export const AsyncButton = ({
  onClick,
  disabled,
  isProcessing,
  label,
  color,
  ...btnProps
}: AsyncButtonProps) => {
  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <Button
        type="button"
        onClick={onClick}
        size="large"
        variant="contained"
        disabled={disabled}
        color={color}
        {...btnProps}
      >
        {label}
      </Button>
      {isProcessing && (
        <CircularProgress
          sx={{
            position: "absolute",
            left: "calc(50% - 10px)",
            top: "calc(50% - 10px)",
          }}
          color={color}
          size={20}
        />
      )}
    </Box>
  );
};
