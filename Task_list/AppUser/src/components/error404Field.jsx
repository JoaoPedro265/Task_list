//UI KIT
import { Box } from "@mui/material";
//Styles
import "./styles/error404.css";

const Error404Field = () => {
  return (
    <Box className="error404">
      <h1>404</h1>
      <p>Page not Found.</p>
      <p>Try searching for something else.</p>
    </Box>
  );
};

export default Error404Field;
