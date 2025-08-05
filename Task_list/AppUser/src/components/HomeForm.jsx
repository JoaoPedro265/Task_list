//UI KIT
import { Box, Checkbox, Container, CircularProgress } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButtonField from "./IconButtonField";
//components
import ButtonField from "../components/ButtonField";
//Styles
import "./styles/HomeForm.css";

const HomeForm = ({
  logout,
  nothing,
  loading,
  data,
  deleteTable,
  viewTask,
  navigate,
}) => {
  return (
    <Container maxWidth="lg" sx={{ padding: 2 }}>
      <ButtonField onClick={logout} type={"button"}>
        Logout
      </ButtonField>
      <div sx={{ alignItems: "center" }}>
        <h1>HOME</h1>
        {nothing ? <h2>No table created. Create a new task.</h2> : ""}
        {loading ? (
          <div className="loading-Box">
            <CircularProgress />
          </div>
        ) : (
          data.map((item) => (
            <div>
              {
                <Box className="Tasks-box" onClick={() => viewTask(item.id)}>
                  <div className="status">
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 50 } }}
                      color="success"
                      checked={item.completed}
                    />
                  </div>
                  <div className="button-TaskName">
                    <span>Task Name:</span>{" "}
                    <span className="arial">{item.taskName}</span>
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
              }
            </div>
          ))
        )}
        <ButtonField
          onClick={() => navigate("/add/task/")}
          color={"success"}
          type={"button"}
        >
          Create Task
        </ButtonField>
      </div>
    </Container>
  );
};

export default HomeForm;
