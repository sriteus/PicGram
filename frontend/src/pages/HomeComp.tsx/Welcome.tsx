import React from "react";
import { Typography, Box, Grid, Paper } from "@mui/material";

interface Props {
  username: string;
}

const Welcome: React.FC<Props> = ({ username }) => {
  return (
    <Box mt={2}>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h4" align="center" gutterBottom>
              Welcome to PicGram
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              Hello, {username}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" mt={2}>
        <Grid item xs={10}>
          <Paper
            elevation={0}
            style={{ padding: "20px", backgroundColor: "#f5f5f5" }}
          >
            <Typography
              variant="body2"
              align="center"
              style={{ fontSize: "10px" }}
            >
              PROFILE PICTURE HERE SOON
            </Typography>
            <Typography
              variant="body2"
              align="center"
              style={{ fontSize: "10px" }}
            >
              Copyright © 2024-Present Sarthak®. All rights reserved.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" mt={2}>
        <Grid item xs={10}>
          <Paper
            elevation={0}
            style={{ padding: "20px", backgroundColor: "#f5f5f5" }}
          >
            <Typography
              variant="body2"
              align="center"
              style={{ fontSize: "10px" }}
            >
              Terms and Conditions: Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Eveniet, ad! Quisquam voluptatem dolorum
            </Typography>
            <Typography
              variant="body2"
              align="center"
              style={{ fontSize: "10px" }}
            >
              Copyright © 2024-Present Sarthak®. All rights reserved.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Welcome;
