import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";

export const PersonListWrap = styled(Box)`
  width: 100%;
  min-width: 1280px;
  min-height: 600px;
`;

export const ListWrap = styled(Box)`
  width: 100%;
  min-height: 450px;
  margin-bottom: 20px;
`;

export const PersonCard = styled(Card)`
  min-height: 200px;
  min-width: 240px;
`;

export const PersonSearch = styled(TextField)`
  max-width: 240px;
`;

export const SearchBox = styled(Box)`
  margin-bottom: 20px;
`;

export const PersonCardActions = styled(CardActions)`
  justify-content: center;
`;

export const PersonNoResults = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
