import {
  Button,
  Container,
  Box,
  TextField,
  Switch,
  Checkbox,
} from "@mui/material";
import ButtonField from "./ButtonField";
const CreateTaskField = ({
  addTask,
  taskName,
  setTaskName,
  text,
  setText,
  completed,
  setCompleted,
}) => {
  return (
    <>
      <h1>CREATE TASK</h1>
      <Box className="viewTask-box">
        <form onSubmit={addTask}>
          <TextField
            fullWidth
            required
            label="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <TextField
            fullWidth
            required
            multiline
            rows={10}
            sx={{ marginTop: "10px" }}
            label="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Box className="buttonBox">
            <div className="Buttons">
              <ButtonField
                className={"submit"}
                color={"success"}
                type={"submit"}
              >
                Create Task
              </ButtonField>
            </div>
            <div className="completed">
              <span>Completed:</span>
              <Checkbox
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

export default CreateTaskField;
