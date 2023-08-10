import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import CircularProgress from "@mui/material/CircularProgress";

interface ISpinner {
  size?: number;
}

const SpinnerWrap = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const Spinner = ({ size = 40 }: ISpinner) => {
  return (
    <SpinnerWrap data-testid="spinner_element">
      <CircularProgress size={size} />
    </SpinnerWrap>
  );
};

export default Spinner;
