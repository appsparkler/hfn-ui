import Card from "@mui/material/Card/Card";
import CardContent from "@mui/material/CardContent/CardContent";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import Typography from "@mui/material/Typography/Typography";

export const CardWithHeader: React.FC<{
  heading: string;
  children: React.ReactNode;
}> = ({ heading, children }) => {
  return (
    <Card elevation={1}>
      <CardMedia>
        <Typography
          p={2}
          bgcolor={"primary.main"}
          color="primary.contrastText"
          variant="h5"
        >
          {heading}
        </Typography>
      </CardMedia>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
