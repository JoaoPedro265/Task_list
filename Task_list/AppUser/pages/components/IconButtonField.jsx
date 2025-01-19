import "./styles/IconButtonField.css";
import { IconButton } from "@mui/material";

import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
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
