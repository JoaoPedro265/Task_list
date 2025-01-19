import { TextField, Button, Box } from "@mui/material";
import "./styles/LoginField.css";
const LoginField = ({
  buttonSend,
  setUsername,
  setPassword,
  username,
  password,
}) => {
  return (
    <form onSubmit={buttonSend}>
      <Box className="login-Box">
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
        <Button className="button" variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default LoginField;
