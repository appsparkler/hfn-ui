import Button, { ButtonProps } from "@mui/material/Button";
import { RefObject, useEffect, useMemo, useRef } from "react";
import { CustomTextField, CustomTextFieldProps } from "../../components";
import { CenterOfViewport } from "../../components";
import {
  abhyasiIdRegex,
  emailRegEx,
  abhyasiIdTempRegex,
  mobileNumberRegex,
} from "../../constants";

export type SectionMainStateProps = {
  error?: boolean;
  helperText?: string;
  value: string;
  show?: boolean;
};

export type SectionMainDispatchProps = {
  onChange: CustomTextFieldProps["onChange"];
  onClickStart: ButtonProps["onClick"];
};

export type SectionMainProps = SectionMainStateProps & SectionMainDispatchProps;

export const SectionMain = ({
  onClickStart,
  onChange,
  show,
  error,
  helperText,
  value = "",
}: SectionMainProps) => {
  const idFieldRef: RefObject<HTMLInputElement> | null = useRef(null);

  const isStartButtonEnabled = useMemo(
    () =>
      Boolean(value.match(abhyasiIdRegex)) ||
      Boolean(value.match(emailRegEx)) ||
      Boolean(
        value.match(abhyasiIdTempRegex) ||
          Boolean(value.match(mobileNumberRegex))
      ),
    [value]
  );

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
      <Button
        variant="contained"
        type="button"
        size="large"
        onClick={onClickStart}
        disabled={!isStartButtonEnabled}
      >
        START CHECK IN
      </Button>
    </CenterOfViewport>
  );
};
