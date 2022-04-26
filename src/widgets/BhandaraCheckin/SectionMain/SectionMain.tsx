import { TextField, Typography } from "@mui/material";
import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import { CenterOfViewport } from "../../../components";
import { AsyncButton } from "../../../components/AsyncButton/AsyncButton";
import { ClickHandler, InputChangeHandler } from "../../../types";
import { isAbhyasiId, isEmail, isMobile, isPnr } from "../../../utils";
import { maxWidth } from "../constants";

export type SectionMainStateProps = {
  error?: boolean;
  helperText?: string;
  value: string;
  isProcessing?: boolean;
};

export type SectionMainDispatchProps = {
  onChange: (updatedValue: string) => void;
  onClickStart: (userId: string) => void;
};

export type SectionMainProps = SectionMainStateProps & SectionMainDispatchProps;

export const SectionMain = ({
  onClickStart,
  onChange,
  isProcessing,
  error,
  helperText,
  value = "",
}: SectionMainProps) => {
  const idFieldRef: RefObject<HTMLInputElement> | null = useRef(null);

  const isValidValue = useMemo(
    () =>
      isEmail(value) || isMobile(value) || isAbhyasiId(value) || isPnr(value),
    [value]
  );

  const isStartButtonEnabled = useMemo(
    () => isValidValue && !isProcessing,
    [isProcessing, isValidValue]
  );

  const handleChange = useCallback<InputChangeHandler>(
    ({ target: { value } }) => {
      onChange(value);
    },
    [onChange]
  );

  const handleClickStart = useCallback<ClickHandler>(() => {
    onClickStart(value);
  }, [onClickStart, value]);

  useEffect(() => {
    if (idFieldRef.current) idFieldRef.current.focus();
  }, []);

  return (
    <CenterOfViewport gap={10} width={"100%"} maxWidth={maxWidth} paddingX={1}>
      <Typography variant="h4" color="goldenrod" align="center">
        Golden Book Registration
      </Typography>
      <TextField
        type="text"
        label="PNR / Abhyasi ID / Mobile # / Email"
        variant="outlined"
        autoComplete="off"
        error={error}
        value={value}
        onChange={handleChange}
        helperText={helperText}
        inputRef={idFieldRef}
        fullWidth
      />
      <AsyncButton
        type="button"
        onClick={handleClickStart}
        disabled={!isStartButtonEnabled}
        isProcessing={isProcessing}
      >
        START CHECK IN
      </AsyncButton>
    </CenterOfViewport>
  );
};
