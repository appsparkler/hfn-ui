import {
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  Box,
  SwitchProps,
} from "@mui/material";
import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import {
  AsyncButton,
  ModeSwitch,
  ModeSwitchDispatchProps,
  CenterOfViewport,
  Horizontal,
  Vertical,
} from "components";
import { ClickHandler, InputChangeHandler } from "types";
import { isAbhyasiId, isEmail, isMobile } from "utils";
import { maxWidth } from "widgets/BhandaraCheckin/constants";
import { noop } from "lodash/fp";
import { CustomMenu } from "./CustomMenu";

export type SectionMainStateProps = {
  error?: boolean;
  helperText?: string;
  value: string;
  isProcessing?: boolean;
  isDarkMode?: boolean;
  isScannerOn?: boolean;
  scanBtnDisabled?: boolean;
  scanBtnProcessing?: boolean;
  isOfflineMode?: boolean;
};

export type SectionMainDispatchProps = {
  onChange: (updatedValue: string) => void;
  onClickStart: (userId: string) => void;
  onSwitchMode: ModeSwitchDispatchProps["onSwitch"];
  onClickScan: () => void;
  onSwitchScanner?: (checked: boolean) => void;
  onSwitchOfflineMode?: (checked: boolean) => void;
  onClickOfflineData?: () => void;
};

export type SectionMainProps = SectionMainStateProps & SectionMainDispatchProps;

export const SectionMain = ({
  onClickStart,
  onChange,
  onSwitchMode,
  isDarkMode,
  onClickScan,
  onSwitchScanner = noop,
  onSwitchOfflineMode = noop,
  onClickOfflineData = noop,
  scanBtnDisabled,
  scanBtnProcessing,
  isScannerOn,
  isProcessing,
  isOfflineMode,
  error,
  helperText,
  value = "",
}: SectionMainProps) => {
  const idFieldRef: RefObject<HTMLInputElement> | null = useRef(null);

  const isValidValue = useMemo(
    () => isEmail(value) || isMobile(value) || isAbhyasiId(value),
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

  const handleSwitchScanner = useCallback<NonNullable<SwitchProps["onChange"]>>(
    (evt, checked) => {
      onSwitchScanner(checked);
    },
    [onSwitchScanner]
  );

  const handleSwitchNetwork = useCallback<NonNullable<SwitchProps["onChange"]>>(
    (evt, checked) => {
      onSwitchOfflineMode(checked);
    },
    [onSwitchOfflineMode]
  );

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
        label="Abhyasi ID / Mobile # / Email"
        variant="outlined"
        autoComplete="off"
        error={error}
        value={value}
        onChange={handleChange}
        helperText={helperText}
        inputRef={idFieldRef}
        fullWidth
      />
      <Horizontal gap={3}>
        <AsyncButton
          type="button"
          onClick={handleClickStart}
          disabled={!isStartButtonEnabled}
          isProcessing={isProcessing}
        >
          START CHECK IN
        </AsyncButton>
        <AsyncButton
          color="warning"
          startIcon={<BarcodeSVG />}
          disabled={scanBtnProcessing || scanBtnDisabled}
          isProcessing={scanBtnProcessing}
          onClick={onClickScan}
        >
          Scan
        </AsyncButton>
      </Horizontal>

      <Vertical>
        <FormControlLabel
          control={
            <Switch
              checked={isScannerOn}
              disabled={scanBtnProcessing}
              onChange={handleSwitchScanner}
            />
          }
          label="Scanner"
        />

        {false && (
          <FormControlLabel
            control={
              <Switch checked={isOfflineMode} onChange={handleSwitchNetwork} />
            }
            label="Offline Mode"
          />
        )}
      </Vertical>
      <Box position="fixed" right={0} top={0}>
        <Horizontal alignItems={"center"}>
          <ModeSwitch checked={isDarkMode} onSwitch={onSwitchMode} />
          <CustomMenu onClickOfflineData={onClickOfflineData} />
        </Horizontal>
      </Box>
    </CenterOfViewport>
  );
};

const BarcodeSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5zM3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" />
  </svg>
);
