import { Button } from "@mui/material";
import "./styles/ButtonField.css";
const ButtonField = ({ color, onClick, type, children }) => {
  return (
    <Button
      className="button"
      variant="contained"
      type={type}
      color={color}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ButtonField;
