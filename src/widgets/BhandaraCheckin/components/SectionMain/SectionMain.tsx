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
  CenterOfViewport,
  Horizontal,
  Vertical,
  SelectField,
} from "components";
import { ClickHandler, InputChangeHandler } from "types";
import { isAbhyasiId, isEmail, isMobile } from "utils";
import { maxWidth } from "widgets/BhandaraCheckin/constants";
import { noop } from "lodash/fp";
import { CustomMenu } from "./CustomMenu";
import { SectionMainProps } from "widgets/BhandaraCheckin/types";
import { QrCode2 } from "@mui/icons-material";
import { textStrings } from "widgets/BhandaraCheckin/constants";

export const SectionMain = ({
  env,
  onClickStart,
  onChange,
  onSwitchMode,
  isDarkMode,
  onClickScan,
  onSwitchScanner = noop,
  onMount = noop,
  onRefresh = noop,
  scanBtnDisabled,
  scanBtnProcessing,
  isScannerOn,
  isProcessing,
  error,
  helperText,
  value = "",
  batches,
  selectedBatch,
  onChangeBatch,
}: SectionMainProps) => {
  const idFieldRef: RefObject<HTMLInputElement> | null = useRef(null);

  const isValidValue = useMemo(
    () => isEmail(value) || isMobile(value) || isAbhyasiId(value),
    [value]
  );

  const isStartButtonEnabled = useMemo(
    () => isValidValue && !isProcessing && !!selectedBatch,
    [isProcessing, isValidValue, selectedBatch]
  );

  const handleChange = useCallback<InputChangeHandler>(
    ({ target: { value } }) => {
      onChange(value);
    },
    [onChange]
  );

  const handleClickStart = useCallback<ClickHandler>(() => {
    onClickStart(value.trim());
  }, [onClickStart, value]);

  const handleSwitchScanner = useCallback<NonNullable<SwitchProps["onChange"]>>(
    (evt, checked) => {
      onSwitchScanner(checked);
    },
    [onSwitchScanner]
  );

  useEffect(() => {
    if (idFieldRef.current) idFieldRef.current.focus();
    onMount();
  }, [onMount]);

  return (
    <CenterOfViewport gap={3} width={"100%"} maxWidth={maxWidth} p={1}>
      <Vertical marginTop={1} display="flex" alignItems={"center"}>
        <img
          src="150logo_gold.png"
          alt={textStrings.LALAJI_LOGO_ALT_TEXT}
          width="200"
        />
        <Typography variant="h4" color="goldenrod" align="center">
          Golden Book Registration
        </Typography>
      </Vertical>
      <SelectField
        label="Batch"
        labelId="bhandara-batch"
        name="selectedBatch"
        onChange={onChangeBatch}
        value={selectedBatch}
        required
        options={batches}
        fullWidth
      />
      <TextField
        type="text"
        label="Abhyasi ID / Mobile # / Email"
        variant="outlined"
        required
        autoComplete="off"
        error={error}
        value={value}
        onChange={handleChange}
        helperText={helperText}
        inputRef={idFieldRef}
        fullWidth
        FormHelperTextProps={{
          sx: {
            maxHeight: 38,
            height: 38,
          },
        }}
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
          endIcon={<QrCode2 />}
        ></AsyncButton>
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
      </Vertical>
      <Box position="fixed" right={0} top={0}>
        <Horizontal alignItems={"center"}>
          <ModeSwitch checked={isDarkMode} onSwitch={onSwitchMode} />
          <CustomMenu onRefreshApp={onRefresh} />
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
