import { TextField } from "@mui/material";
import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import { CenterOfViewport } from "../../components";
import { AsyncButton } from "../../components/AsyncButton/AsyncButton";
import { ClickHandler, InputChangeHandler } from "../../types";
import { isAbhyasiId, isAbhyasiIdTemp, isEmail, isMobile } from "../../utils";

export type SectionMainStateProps = {
  error?: boolean;
  helperText?: string;
  value: string;
  show?: boolean;
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

  if (!show) {
    return null;
  }

  return (
    <CenterOfViewport
      gap={10}
      width={"100%"}
      maxWidth={400}
      paddingX={1}
      marginX="auto"
    >
      <TextField
        type="text"
        label="Abhyasi ID / Mobile # / Email"
        variant="outlined"
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
