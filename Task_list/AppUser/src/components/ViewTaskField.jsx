//UI KIT
import { Button, Box, Container, Card, Switch } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
//Styles

const ViewTaskField = ({ data, deleteTask, editTask }) => {
  return (
    <Container maxWidth="lg" sx={{ padding: 2 }}>
      <Button
        variant="outlined"
        onClick={() => navigate("/home/")}
        startIcon={<ArrowBackIosNewIcon />}
      >
        Back to Home
      </Button>

      <h1>TASK</h1>
      <Box className="viewTask-box">
        <span>Task Name:</span>
        <Card variant="outlined" className="taskName-card">
          {data.taskName}
        </Card>
        <span>Text:</span>
        <Card variant="outlined" className="text-card">
          {data.text}
        </Card>
        <span>Date:</span>
        {data.data
          .replace("T", " ")
          .replace("Z", "")
          .replace("-", "/")
          .replace("-", "/")}
        <br />

        <div>
          <span>Completed:</span>
          <Switch disabled color="success" checked={data.completed}></Switch>
        </div>
        <Button
          variant="contained"
          className="button"
          sx={{ backgroundColor: "orange" }}
          onClick={editTask}
        >
          Edit Task
        </Button>
        <Button variant="contained" color="error" onClick={deleteTask}>
          Delete Task
        </Button>
      </Box>
    </Container>
  );
};

export default ViewTaskField;
