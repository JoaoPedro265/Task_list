import { Box, Checkbox } from "@mui/material";
import "./styles/HomeForm.css";
//UI KIT
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButtonField from "./IconButtonField";
//components

const HomeForm = ({ item, deleteTable, viewTask }) => {
  return (
    <Box className="Tasks-box" onClick={() => viewTask(item.id)}>
      <div className="status">
        <Checkbox
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
        <IconButtonField
          onClick={(e) => {
            e.stopPropagation();
            deleteTable(e, item.id);
          }}
        >
          <DeleteOutlineIcon sx={{ fontSize: 40 }} />
        </IconButtonField>
      </div>
    </Box>
  );
};

export default HomeForm;
