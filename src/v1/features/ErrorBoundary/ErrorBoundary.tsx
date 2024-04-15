import { Typography } from "@mui/material";
import { Vertical } from "components";
import { random } from "lodash/fp";
import { ScreenWrapper } from "v1/features/components/ScreenWrapper/ScreenWrapper";
import { ContainedButton } from "v1/features/components/buttons/ContainedButton/ContainedButton";

export const ErrorBoundary: React.FC<{
  onClickGoToMainScreen: () => void;
}> = ({ onClickGoToMainScreen }) => {
  return (
    <ScreenWrapper mt={4}>
      <Vertical gap={2} justifyContent={"center"}>
        <Typography fontSize={80} align="center">
          {["🐝", "🦋", "🐥", "🦄", "🐌", "🐸"][random(0, 5)]}
        </Typography>
        <Typography align="center" variant="h5" color="warning.main">
          something went wrong!!
        </Typography>
        <ContainedButton
          onClick={onClickGoToMainScreen}
          sx={{ alignSelf: "center" }}
        >
          Return to main screen
        </ContainedButton>
      </Vertical>
    </ScreenWrapper>
  );
};
