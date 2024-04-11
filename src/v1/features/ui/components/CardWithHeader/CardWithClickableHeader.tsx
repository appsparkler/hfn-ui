import { RadioButtonChecked } from "@mui/icons-material";
import RadioButtonUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card/Card";
import CardContent from "@mui/material/CardContent/CardContent";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import Typography from "@mui/material/Typography/Typography";
import { Horizontal } from "components";

export const CardWithClickableHeader: React.FC<{
  heading: string;
  isSelected: boolean;
  onClickHeader: () => void;
  children: React.ReactNode;
}> = ({ heading, isSelected, onClickHeader, children }) => {
  return (
    <Card elevation={1}>
      <CardActionArea onClick={onClickHeader}>
        <CardMedia>
          <Typography
            p={2}
            bgcolor={isSelected ? "primary.main" : "primary.light"}
            color={"primary.contrastText"}
            variant="h5"
          >
            <Horizontal alignItems="center" gap={1}>
              {isSelected ? <RadioButtonChecked /> : <RadioButtonUnchecked />}{" "}
              {heading}
            </Horizontal>
          </Typography>
        </CardMedia>
      </CardActionArea>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
