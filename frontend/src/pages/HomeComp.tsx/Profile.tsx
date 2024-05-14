import React, { useState, useEffect } from "react";
import { Typography, Box, Grid } from "@mui/material";
import axios from "axios";
import { checkSession } from "../../components/useGetUserData";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Nav from "./Nav";
import { POSTS } from "../Home";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const Profile: React.FC = () => {
  axios.defaults.withCredentials = true;
  const [userData, setUserData] = useState<any>();
  const navigate = useNavigate();
  const [post, setPost] = useState<POSTS[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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
  }, [navigate]);

  useEffect(() => {
    if (userData) {
      axios
        .get(
          `http://localhost:2200/userauth/getuserposts?page=${page}&limit=6&username=${userData.username}`
        )
        .then((res) => {
          setPost(res.data);
          setPage(3);
        })
        .catch((err) => console.log(err));
    }
  }, [userData]);

  const fetchPosts = () => {
    setLoading(true);
    axios
      .get(
        `http://localhost:2200/userauth/getuserposts?page=${page}&limit=3&username=${userData.username}`
      )
      .then((res) => {
        setPost((prevPosts) => [...prevPosts, ...res.data]);
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleScroll = (event: any) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollTop > 0) {
      const scrollBottom = scrollHeight - (scrollTop + clientHeight);
      const fetchThreshold = 200;

      if (scrollBottom < fetchThreshold && !loading) {
        fetchPosts();
        console.log("Fetching Posts");
      }
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
        <Grid item xs={10}>
          <Item
            style={{
              height: "80vh",
              overflow: "auto",
              textAlign: "center",
            }}
            onScroll={handleScroll}
          >
            {userData && (
              <Typography variant="h6">{userData.username}</Typography>
            )}

            <Grid container spacing={2}>
              {post.map((value, index) => (
                <Grid item xs={4} key={index}>
                  <Item
                    style={{
                      height: "40vh",
                      overflow: "hidden",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={value.image}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                      alt={value.description}
                    />
                    <div>{value.name}</div>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
