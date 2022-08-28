import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "@mui/material";
import { breakPipe } from "../helper/StringOps";
import { Divider, Chip } from "@mui/material";

export default function TournamentCard(props) {
  const { tour } = props;
  let tourName = breakPipe(tour.tour.name);
  let desc = breakPipe(tour.tour.description);

  return (
    <Link
      href={`/tournament/${tour.tour.slug}/${tour.tour.id}`}
      underline="none"
      key={tour.tour.id}
    >
      <Card sx={{ height: 350 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://picsum.photos/300/200"
            alt="Tournament Image"
          />
          <CardContent>
            {tourName.map((i) => {
              if (i == tourName[0]) {
                return (
                  <Typography gutterBottom variant="body1" component="div">
                    {i}
                  </Typography>
                );
              }
            })}
            <Divider sx={{ m: 1 }} />
            {desc.map((i) => {
              return (
                <Chip sx={{ m: 0.5, p: 0.5 }} label={i} variant="outlined" />
              );
            })}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Open
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
}
