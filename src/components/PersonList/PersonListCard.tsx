import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";

import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { CardActionArea, CardMedia } from "@mui/material";
import starWarsLogo from "../../assets/Star_Wars.svg";

import { PersonCard, PersonCardActions } from "./styles";

interface PersonProps {
  personName: string;
  id: string;
}

const PersonListCard = memo(({ personName, id }: PersonProps) => {
  const navigate = useNavigate();
  const handleNavigateToProfile = () => {
    navigate("person/" + id);
  };
  return (
    <PersonCard>
      <CardActionArea onClick={handleNavigateToProfile}>
        <CardMedia
          component="img"
          height="100"
          image={starWarsLogo}
          alt="star wars logo"
        />
        <CardContent>
          <Typography>{personName}</Typography>
        </CardContent>
      </CardActionArea>
      <PersonCardActions>
        <Button>
          <Link color="primary" to={`/person/${id}`}>
            view full profile
          </Link>
        </Button>
      </PersonCardActions>
    </PersonCard>
  );
});

export default PersonListCard;
