import { CheckCircle } from "@mui/icons-material";
import Typography from "@mui/material/Typography/Typography";
import { Vertical } from "components";
import { ContainedButton } from "../components/buttons/ContainedButton/ContainedButton";

export const SuccessScreen: React.FC<{
  onClickGoToMainScreen: () => void;
}> = ({ onClickGoToMainScreen }) => {
  return (
    <Vertical
      alignItems={"center"}
      justifyContent={"center"}
      maxWidth={400}
      sx={{
        width: "auto",
        mx: "auto",
        p: 2,
      }}
      gap={2}
    >
      <Vertical mt={12} justifyContent={"center"} alignItems={"center"}>
        <CheckCircle
          color="success"
          sx={{
            fontSize: 80,
          }}
        />
        <Typography variant="h5">Checked In</Typography>
      </Vertical>
      <ContainedButton onClick={onClickGoToMainScreen}>
        Return to Main Screen
      </ContainedButton>
    </Vertical>
  );
};
