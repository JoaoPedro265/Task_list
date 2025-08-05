//UI Kit
import Alert from "@mui/material/Alert";
import { TextField, Button, Box } from "@mui/material";
//styles
import "./styles/LoginField.css";

const LoginField = ({
  buttonSend,
  setUsername,
  setPassword,
  username,
  password,
  alert,
  success,
  loading,
}) => {
  return (
    <form onSubmit={buttonSend}>
      <Box className="login-Box">
        {alert ? (
          <Alert variant="outlined" severity="warning">
            Invalid or unauthenticated name or password.
          </Alert>
        ) : (
          ""
        )}
        {success ? (
          <Alert variant="outlined" severity="success">
            user created successfully.
          </Alert>
        ) : (
          ""
        )}
        <h1>Login</h1>
        <TextField
          fullWidth
          required
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Corrigido para 'setPassword' label="Outlined" variant="outlined" /
        />
        <TextField
          fullWidth
          required
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Corrigido para 'setPassword' label="Outlined" variant="outlined" /
        />
        {loading ? (
          <Button variant="contained" disabled>
            loadinig...
          </Button>
        ) : (
          <Button variant="contained" type="submit">
            Submit
          </Button>
        )}
        <a href="register/">Create Account</a>
      </Box>
    </form>
  );
};

export default LoginField;
