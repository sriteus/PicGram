import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Nav from "./HomeComp.tsx/Nav";
import Posts from "./HomeComp.tsx/Posts";

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

  useEffect(() => {
    axios
      .get("http://localhost:2200/userauth/")
      .then((res) => {
        if (!res.data.validUser) {
          navigate("/login");
        }
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

  //   Fetch first two posts on initial mount
  useEffect(() => {
    axios
      .get(`http://localhost:2200/userauth/getposts?page=${page}&limit=2`)
      .then((res) => {
        setPost(res.data);
        setPage(3);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  const handleScroll = (event: any) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight && !loading) {
      fetchPosts();
      console.log("Fetching Posts");
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center">
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
          <Grid item xs={7}>
            <Item
              style={{
                height: "80vh",
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              quaerat explicabo dolores doloremque nostrum repudiandae
              architecto veritatis vero quod harum fugit, itaque obcaecati iste
              pariatur vel cupiditate consequuntur. Natus, officiis?
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
