//UI KIT
import { IconButton } from "@mui/material";
//Styles
import "./styles/IconButtonField.css";

const IconButtonField = ({ onClick, type, children }) => {
  return (
    <IconButton
      className="icon-button"
      aria-label="delete"
      type={type}
      onClick={onClick}
      color="error"
    >
      {children}
    </IconButton>
  );
};
export default IconButtonField;
