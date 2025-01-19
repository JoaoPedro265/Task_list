import { TextField, Button, Switch, Box, Checkbox } from "@mui/material";
import "./styles/EditForm.css";
const EditForm = ({
  setCompleted,
  setTaskName,
  setText,
  editTask,
  taskName,
  text,
  completed,
  deleteTask,
}) => {
  return (
    <>
      <h1>EDIT TASK</h1>
      <Box className="viewTask-box">
        <form onSubmit={editTask}>
          <TextField
            fullWidth
            required
            id="outlined-basic"
            variant="outlined"
            label="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <div>
            <TextField
              fullWidth
              required
              multiline
              label="Text"
              rows={10}
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></TextField>
          </div>
          <Box className="buttonBox">
            <div className="Buttons">
              <Button
                className="button"
                variant="contained"
                color="success"
                type="submit"
              >
                save
              </Button>
              <Button variant="contained" color="error" onClick={deleteTask}>
                Delete Task
              </Button>
            </div>
            <div className="completed">
              <span>Completed:</span>
              <Checkbox
                defaultChecked
                color="success"
                sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
            </div>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default EditForm;
