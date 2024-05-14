import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Nav from "./HomeComp.tsx/Nav";
import Posts from "./HomeComp.tsx/Posts";
import Welcome from "./HomeComp.tsx/Welcome";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export interface POSTS {
  name: string;
  description: string;
  image: string;
}

const Home = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    axios
      .get("http://localhost:2200/userauth/")
      .then((res) => {
        if (!res.data.validUser) {
          navigate("/login");
        }
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [post, setPost] = useState<POSTS[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPosts = () => {
    setLoading(true);
    axios
      .get(`http://localhost:2200/userauth/getposts?page=${page}&limit=1`)
      .then((res) => {
        setPost((prevPosts) => [...prevPosts, ...res.data]);
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  console.log(userData);

  //   Fetch first post on initial mount
  useEffect(() => {
    axios
      .get(`http://localhost:2200/userauth/getposts?page=${page}&limit=1`)
      .then((res) => {
        setPost(res.data);
        setPage(2);
      })
      .catch((err) => console.log(err));
  }, []);

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
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={1}>
            <Item
              style={{
                height: "50vh",
                overflow: "hidden",
                textAlign: "center",
              }}
            >
              <Nav />
            </Item>
          </Grid>
          <Grid item xs={7}>
            <Item
              style={{
                height: "100vh",
                overflow: "auto",
              }}
              onScroll={handleScroll}
            >
              {post.map((value, index) => (
                <Posts
                  key={index}
                  name={value.name}
                  description={value.description}
                  image={value.image}
                />
              ))}
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item style={{ height: "80vh", overflow: "hidden" }}>
              {userData && <Welcome username={userData.username} />}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
