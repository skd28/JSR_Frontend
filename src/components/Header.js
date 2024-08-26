import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };
  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    console.log(movie);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#c7e1f7" }}>
      <Toolbar >
        <Box width={"20%"}>
          <IconButton LinkComponent={Link} to="/">
            <MovieIcon style={{ fontSize: 50 }}  />
          </IconButton>
        </Box>
        <Box width={"50%"} margin="auto">
        </Box>
        <Box width={"50%"}  display={"flex"}  >
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab LinkComponent={Link} to="/movies" label="Movies" style={{ fontSize: 20, color: 'black' }} />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab label="Admin" style={{ fontSize: 20, color: 'black' }} LinkComponent={Link} to="/admin" />
                <Tab label="User" style={{ fontSize: 20, color: 'black' }} LinkComponent={Link} to="/auth" />
              </>
            )}
            {isUserLoggedIn && (
              <>
                <Tab label="Profile" style={{ fontSize: 20, color: 'black' }} LinkComponent={Link} to="/user" />
                <Tab
                  onClick={() => logout(false)}
                  label="Logout" style={{ fontSize: 20, color: 'black' }}
                  LinkComponent={Link}
                  to="/"
                />
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab label="Add Movie" style={{ fontSize: 20, color: 'black' }} LinkComponent={Link} to="/add" />
                <Tab label="Profile" style={{ fontSize: 20, color: 'black' }} LinkComponent={Link} to="/user-admin" />
                <Tab
                  onClick={() => logout(true)}
                  label="Logout" style={{ fontSize: 20, color: 'black' }}
                  LinkComponent={Link}
                  to="/"
                />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
