import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Container, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface SignupInfo {
  name: string;
  email: string;
  mobile: number | null;
  age: number | null;
  password: string;
}

const Signup = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    name: "",
    email: "",
    mobile: null,
    age: null,
    password: "",
  });

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const apiCall = await axios.post(
        "http://localhost:2200/userauth/signup",
        signupInfo
      );
      if (apiCall.data.success) {
        alert(apiCall.data.message);
        navigate("/login");
      } else {
        alert(apiCall.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} mb={5}>
        <Card>
          <form action="" onSubmit={handleSubmit}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Sign Up Now
              </Typography>
              <TextField
                margin="normal"
                fullWidth
                label="Name"
                type="name"
                variant="outlined"
                required
                name="name"
                onChange={handleOnchange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                required
                name="email"
                onChange={handleOnchange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Mobile"
                type="text"
                variant="outlined"
                required
                name="mobile"
                onChange={handleOnchange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Age"
                type="number"
                variant="outlined"
                required
                name="age"
                onChange={handleOnchange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                required
                name="password"
                onChange={handleOnchange}
              />
            </CardContent>
            <CardActions>
              <Button
                size="large"
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Sign Up
              </Button>
              <Button
                size="large"
                color="primary"
                variant="contained"
                fullWidth
                onClick={() => {
                  navigate("/login");
                }}
              >
                Go To Login
              </Button>
            </CardActions>
          </form>
        </Card>
      </Box>
    </Container>
  );
};

export default Signup;
