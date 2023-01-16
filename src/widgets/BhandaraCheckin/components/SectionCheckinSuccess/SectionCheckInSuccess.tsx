import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, ButtonProps, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { Vertical, CenterOfViewport, TimedConfetti } from "components";
import { maxWidth, textStrings } from "widgets/BhandaraCheckin/constants";

export type SectionCheckinStateProps = {
  enableConfetti?: boolean;
};

export type SectionCheckinDispatchProps = {
  onClickReturn: ButtonProps["onClick"];
};

export type SectionCheckinSuccessProps = SectionCheckinStateProps &
  SectionCheckinDispatchProps;

export const SectionCheckinSuccess = ({
  enableConfetti = true,
  onClickReturn,
}: SectionCheckinSuccessProps) => {
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (wrapperRef.current) {
      setShowConfetti(true);
    }
    return () => {
      setShowConfetti(false);
    };
  }, []);

  const confettiEnabled = useMemo(
    () => enableConfetti && showConfetti,
    [enableConfetti, showConfetti]
  );

  useEffect(() => {
    return () => {
      setShowConfetti(false);
    };
  }, []);

  return (
    <CenterOfViewport
      ref={wrapperRef}
      gap={10}
      paddingX={1}
      maxWidth={maxWidth}
    >
      <Vertical alignItems={"center"}>
        <img
          src="150logo_gold.png"
          alt={textStrings.LALAJI_LOGO_ALT_TEXT}
          width="200"
        />
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
      {confettiEnabled ? (
        <TimedConfetti
          height={window.screen.height}
          width={window.screen.width}
          style={{
            overflow: "hidden",
            position: "fixed",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        />
      ) : null}
    </CenterOfViewport>
  );
};
