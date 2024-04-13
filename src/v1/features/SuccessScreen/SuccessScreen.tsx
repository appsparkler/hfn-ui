import { CheckCircle } from "@mui/icons-material";
import Typography from "@mui/material/Typography/Typography";
import { Vertical } from "components";
import { ContainedButton } from "../../ui/components/buttons/ContainedButton/ContainedButton";
import { ScreenWrapper } from "../../ui/components/ScreenWrapper/ScreenWrapper";

export const SuccessScreen: React.FC<{
  onClickGoToMainScreen: () => void;
}> = ({ onClickGoToMainScreen }) => {
  return (
    <ScreenWrapper gap={2}>
      <Vertical mt={12} justifyContent={"center"} alignItems={"center"}>
        <CheckCircle
          color="success"
          sx={{
            fontSize: 80,
          }}
        />
        <Typography variant="h5">Checked In</Typography>
      </Vertical>
      <ContainedButton
        onClick={onClickGoToMainScreen}
        sx={{ alignSelf: "center" }}
      >
        Return to Main Screen
      </ContainedButton>
    </ScreenWrapper>
  );
};
