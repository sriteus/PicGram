import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { TextField, Button, Typography, Container, Grid } from "@mui/material";
import axios from "axios";
import { checkSession } from "../../components/useGetUserData";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Nav from "./Nav";

interface FormData {
  description: string;
  image: File | null;
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const UploadPost: React.FC = () => {
  axios.defaults.withCredentials = true;
  const [userData, setUserData] = useState<any>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fullData = await checkSession();
        if (fullData === -1) {
          navigate("/login");
        }
        setUserData(fullData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState<FormData>({
    description: "",
    image: null,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("description", formData.description);
    formDataToSend.append("name", userData.username);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:2200/userAuth/addimage",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setFormData({ description: "", image: null });
      alert("Uploaded successfully!");
      window.location.reload();
    } catch (error) {
      alert("Error Uploading");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Item
            style={{
              height: "80vh",
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            <Nav />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item
            style={{
              height: "80vh",
              overflow: "hidden",
              textAlign: "center",
            }}
          >
            <Typography variant="h3" gutterBottom>
              Upload to PicGram
            </Typography>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={2}
                style={{
                  marginBottom: "1rem",
                  fontFamily: "Comic Sans MS",
                  color: "#ff8928",
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: "1rem" }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{
                  fontWeight: "bold",
                  borderRadius: "10px",
                  backgroundColor: "transparent",
                  color: "black",
                }}
              >
                Upload
              </Button>
            </form>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UploadPost;
