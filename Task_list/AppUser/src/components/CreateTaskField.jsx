import { useNavigate } from "react-router-dom";
//components
import ButtonField from "./ButtonField";
//UI kit
import { Box, TextField, Checkbox, Button, Container } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const CreateTaskField = ({
  addTask,
  taskName,
  setTaskName,
  text,
  setText,
  completed,
  setCompleted,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Container maxWidth="lg" sx={{ padding: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIosNewIcon />}
          className="button"
          onClick={() => navigate("/home/")}
        >
          Back to Home
        </Button>
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
      </Container>
    </>
  );
};

export default CreateTaskField;
