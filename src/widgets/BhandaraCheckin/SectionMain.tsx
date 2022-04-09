import { Box, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import { CustomTextField, CustomTextFieldProps } from "../../components";
import { CenterOfViewport } from "../../components";
import { ClickHandler } from "../../types";
import { isAbhyasiId, isAbhyasiIdTemp, isEmail, isMobile } from "../../utils";

export type SectionMainStateProps = {
  error?: boolean;
  helperText?: string;
  value: string;
  show?: boolean;
  isProcessing?: boolean;
};

export type SectionMainDispatchProps = {
  onChange: CustomTextFieldProps["onChange"];
  onClickStart: (userId: string) => void;
};

export type SectionMainProps = SectionMainStateProps & SectionMainDispatchProps;

export const SectionMain = ({
  onClickStart,
  onChange,
  isProcessing,
  show,
  error,
  helperText,
  value = "",
}: SectionMainProps) => {
  const idFieldRef: RefObject<HTMLInputElement> | null = useRef(null);

  const isValidValue = useMemo(
    () =>
      isEmail(value) ||
      isMobile(value) ||
      isAbhyasiIdTemp(value) ||
      isAbhyasiId(value),
    [value]
  );

  const isStartButtonEnabled = useMemo(
    () => isValidValue && !isProcessing,
    [isProcessing, isValidValue]
  );

  const handleClickStart = useCallback<ClickHandler>(() => {
    onClickStart(value);
  }, [onClickStart, value]);

  useEffect(() => {
    if (idFieldRef.current) idFieldRef.current.focus();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <CenterOfViewport
      gap={10}
      width={"100%"}
      maxWidth={400}
      padding={2}
      marginX="auto"
    >
      <CustomTextField
        label="Abhyasi ID / Mobile # / Email"
        variant="outlined"
        error={error}
        value={value}
        onChange={onChange}
        helperText={helperText}
        inputRef={idFieldRef}
      />
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Button
          type="button"
          onClick={handleClickStart}
          size="large"
          variant="contained"
          disabled={!isStartButtonEnabled}
        >
          START CHECK IN
        </Button>
        {isProcessing && (
          <CircularProgress
            sx={{
              position: "absolute",
              left: "calc(50% - 10px)",
              top: "calc(50% - 10px)",
            }}
            size={20}
          />
        )}
      </Box>
    </CenterOfViewport>
  );
};
