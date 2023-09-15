import {
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  Box,
  SwitchProps,
  Card,
  CardContent,
} from "@mui/material";
import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import {
  AsyncButton,
  ModeSwitch,
  Horizontal,
  Vertical,
  SelectField,
  OptionValue,
} from "components";
import { ClickHandler, InputChangeHandler } from "types";
import { isAbhyasiId, isEmail, isMobile } from "utils";
import { maxWidth, textStrings } from "widgets/BhandaraCheckin/constants";
import { noop } from "lodash/fp";
import { CustomMenu } from "./CustomMenu";
import { Batch, SectionMainProps } from "widgets/BhandaraCheckin/types";
import { QrCode2 } from "@mui/icons-material";

export const SectionMain = ({
  isDarkMode,
  scanBtnDisabled,
  scanBtnProcessing,
  isScannerOn,
  isProcessing,
  error,
  helperText,
  value = "",
  batch,
  onSwitchMode,
  onRefresh = noop,
  onClickScan,
  onMount = noop,
  onChange,
  onChangeBatch,
  onClickStart,
  onClickDashboard,
  onSwitchScanner = noop,
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
    onClickStart(value.trim(), batch);
  }, [batch, onClickStart, value]);

  const handleSwitchScanner = useCallback<NonNullable<SwitchProps["onChange"]>>(
    (evt, checked) => {
      onSwitchScanner(checked);
    },
    [onSwitchScanner]
  );

  const handleChangeBatch = useCallback(
    (_name: string, newValue: OptionValue) => {
      onChangeBatch(newValue as Batch);
    },
    [onChangeBatch]
  );

  useEffect(() => {
    if (idFieldRef.current) idFieldRef.current.focus();
    onMount();
  }, [onMount]);

  return (
    <Vertical mx="auto" justifyContent={"center"} alignItems={"center"}>
      <Card sx={{ mt: 6, maxWidth: maxWidth, opacity: 0.86 }}>
        <CardContent>
          <Vertical alignItems={"center"} gap={2}>
            <img
              src={textStrings.hfn_logo_imgUrl}
              alt={textStrings.hfn_logo_alt}
              width="230"
            />
            <Typography variant="h5" align="center">
              {textStrings.eventTitle}
            </Typography>
            <SelectField
              size="medium"
              autoWidth
              autoComplete="off"
              label="Batch"
              labelId="batch"
              name="batch"
              onChange={handleChangeBatch}
              options={[
                {
                  label: "Batch 1",
                  value: "batch-1",
                },
                {
                  label: "Batch 2",
                  value: "batch-2",
                },
                {
                  label: "Batch 1,Batch 2",
                  value: "batch-1,batch-2",
                },
              ]}
              required
              value={batch}
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
            <Horizontal gap={1}>
              <AsyncButton
                type="button"
                onClick={handleClickStart}
                disabled={!isStartButtonEnabled}
                isProcessing={isProcessing}
                size="large"
              >
                START CHECK IN
              </AsyncButton>
              <AsyncButton
                color="warning"
                startIcon={<BarcodeSVG />}
                disabled={scanBtnProcessing || scanBtnDisabled}
                isProcessing={scanBtnProcessing}
                onClick={onClickScan}
                size="large"
                endIcon={<QrCode2 fontSize="medium" />}
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
                <CustomMenu
                  onClickDashboard={onClickDashboard}
                  onRefreshApp={onRefresh}
                />
              </Horizontal>
            </Box>
          </Vertical>
        </CardContent>
      </Card>
    </Vertical>
  );
};

const BarcodeSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5zM3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" />
  </svg>
);
