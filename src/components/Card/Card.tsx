import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Horizontal, Vertical } from "components/Boxes";

export function Tiles() {
  return [{ id: "tile-1" }, { id: "tile-2" }].map((tileData) => (
    <MultiActionAreaCard key={tileData.id} {...tileData} />
  ));
}

export function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Vertical>
          <FormControlLabel
            control={
              <Checkbox checked={true} onChange={() => {}} name="jason" />
            }
            label="Jane Mathew"
          />
          <Typography variant="h6">Dorm Preference</Typography>
          <Typography variant="body2" color="text.secondary">
            Comfort Dorm B1, LB
          </Typography>
        </Vertical>
      </CardContent>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
