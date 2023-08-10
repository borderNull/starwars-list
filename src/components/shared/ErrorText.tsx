import Typography from "@mui/material/Typography";

interface IError {
  error: string;
}

const ErrorText = ({ error }: IError) => {
  return <Typography>Something happened: {error}</Typography>;
};

export default ErrorText;
