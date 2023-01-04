import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import { Outlet, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
export default function Layout() {
  const navigate = useNavigate();

  const goHome = () => {
    // 이전 페이지로 이동
    navigate("/");
  };

  return (
    <div>
      <header>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                aria-label="home"
                color="inherit"
                onClick={goHome}
                sx={{ mr: 3 }}
              >
                <HomeIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                ExamApp
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </header>
      <main>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Outlet />
        </Stack>
      </main>
    </div>
  );
}
