import styled from "@emotion/styled";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";

export const PersonPaper = styled(Paper)`
  min-width: 600px;
  display: flex;
  margin-top: 20px;
`;

export const PersonCardWrap = styled(Box)`
  width: 100%;
  display: flex;
  align-items: flex-start;
`;

export const PersonDetails = styled(Box)`
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`;

export const PersonDetailsRow = styled(Box)`
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
`;

export const PersonAction = styled(Box)`
  margin: 20px;
`;

export const PersonActionButtons = styled(PersonAction)`
  display: flex;
  flex-direction: column;
`;

export const PersonCancelButton = styled(Button)`
  margin-top: 10px;
`;

export const PersonChangeButton = styled(Button)`
  min-width: 160px;
`;

export const PersonDetailsTitle = styled(Typography)`
  text-transform: capitalize;
`;

export const PersonDetailsText = styled(Typography)`
  text-align: right;
  max-width: 350px;
`;

export const PersonEditInput = styled(OutlinedInput)`
  max-width: 180px;
  & .MuiOutlinedInput-input {
    text-align: right;
  }
`;

export const PersonSubItemWrap = styled(Box)`
  max-width: 560px;
  & + & {
    border-top: 2px solid #0b0a0a26;
  }
`;
