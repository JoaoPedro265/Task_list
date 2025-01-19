import { Button, Box, Container, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./styles/HomeForm.css";
//UI KIT
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButtonField from "./IconButtonField";
//components
import ButtonField from "./ButtonField";

const HomeForm = ({ item, deleteTable, viewTask, editTask, setNothing }) => {
  const navigate = useNavigate();
  return (
    <Box className="Tasks-box" key={item.id} onClick={() => viewTask(item.id)}>
      <div className="status">
        <Checkbox
          defaultChecked
          sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
          color="success"
          checked={item.completed}
        />
      </div>
      <div className="button-TaskName">
        <span>Task Name:</span> <span className="arial">{item.taskName}</span>
        <br></br>
        <span>Date:</span>
        <span className="arial">
          {item.data
            .replace("T", " ")
            .replace("Z", "")
            .replace("-", "/")
            .replace("-", "/")
            .replace(/\.\d+$/, "")}
        </span>
      </div>
      <div className="button-bin">
        <IconButtonField onClick={(e) => deleteTable(e, item.id)}>
          <DeleteOutlineIcon sx={{ fontSize: 40 }} />
        </IconButtonField>
      </div>
    </Box>
  );
};

export default HomeForm;
