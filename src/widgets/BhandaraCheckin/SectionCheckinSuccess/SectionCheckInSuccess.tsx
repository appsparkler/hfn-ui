import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, ButtonProps, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { Vertical } from "../../../components";
import { CenterOfViewport } from "../../../components/CenterOfViewport/CenterOfViewport";
import { TimedConfetti } from "../../../components/TimedConfetti";
import { maxWidth } from "../constants";

export type SectionCheckinStateProps = {};

export type SectionCheckinDispatchProps = {
  onClickReturn: ButtonProps["onClick"];
};

export type SectionCheckinSuccessProps = SectionCheckinStateProps &
  SectionCheckinDispatchProps;

export const SectionCheckinSuccess = ({
  onClickReturn,
}: SectionCheckinSuccessProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (wrapperRef.current) {
      const { offsetHeight, offsetWidth, clientHeight, clientWidth } =
        wrapperRef.current;
      console.log({ offsetHeight, offsetWidth, clientHeight, clientWidth });
    }
  }, []);

  return (
    <CenterOfViewport
      ref={wrapperRef}
      gap={10}
      paddingX={1}
      maxWidth={maxWidth}
    >
      <Vertical alignItems={"center"}>
        <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />
        <Typography variant="h5">{`Checked In`}</Typography>
      </Vertical>
      <Button
        type="button"
        variant="contained"
        size="large"
        onClick={onClickReturn}
      >
        Return to main page
      </Button>
      <TimedConfetti
        height={wrapperRef.current?.offsetHeight}
        width={wrapperRef.current?.offsetWidth}
      />
    </CenterOfViewport>
  );
};
