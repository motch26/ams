import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import FolderIcon from "@mui/icons-material/Folder";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Context } from "./../Context";
import Dropbox from "./Dropbox";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@mui/material";

function MyAppBar() {
  const { actions, program, isDropboxOpen } = useContext(Context);
  const [isLoggedOut, setLogOut] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["userID", "isAdmin"]);

  const logout = () => {
    removeCookie("userID", { path: "/" });
    removeCookie("userAdmin", { path: "/" });
    setLogOut(true);
  };
  const handleProgramChange = (e) => {
    actions.setProgram(e.target.value);
    actions.setSubShown(false);
    actions.setProgramData(e.target.value);
  };

  const handleDropbox = (bool) => actions.setDropboxOpen(bool);

  const showHome = () => actions.setProgram("");

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CHMSC Accreditation Management System
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <FormControl
                variant="standard"
                sx={{ minWidth: 150, borderRadius: 2, bgcolor: "white" }}
              >
                <Select
                  value={program}
                  label="college"
                  onChange={handleProgramChange}
                  sx={{ p: 1, borderRadius: 5 }}
                >
                  <MenuItem value="BSIT">BSIT</MenuItem>
                  <MenuItem value="BSED">BSED</MenuItem>
                  <MenuItem value="BEED">BEED</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="info"
                size="small"
                sx={{ ml: 3 }}
                startIcon={<HomeIcon />}
                onClick={() => showHome()}
              >
                Home
              </Button>
              <Button
                variant="contained"
                color="warning"
                size="small"
                sx={{ ml: 3 }}
                startIcon={<InventoryIcon />}
                onClick={() => handleDropbox(true)}
              >
                Dropbox
              </Button>
              {parseInt(cookies.isAdmin) ? (
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  sx={{ ml: 3 }}
                  startIcon={<FolderIcon />}
                  onClick={() => handleDropbox(true)}
                >
                  Logs
                </Button>
              ) : null}

              <Button
                variant="contained"
                color="info"
                size="small"
                sx={{ ml: 3 }}
                startIcon={<LogoutIcon />}
                onClick={logout}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isLoggedOut ? <Navigate to="/" /> : null};
      {isDropboxOpen ? <Dropbox /> : null}
    </React.Fragment>
  );
}

export default MyAppBar;
