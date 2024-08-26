import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";
import MovieItem from "./Movies/MovieItem";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  console.log("All Movies :",movies);
  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
      <Box margin={"auto"} width="80%" height={"40vh"} padding={2}>
        <img
          src="https://media.istockphoto.com/id/1032516536/photo/video-archives-concept.webp?b=1&s=612x612&w=0&k=20&c=INJND7S1PuEVZCMNwl5aqazpYlUM1h-LmLlBlBC6Z_M="
          alt="Brahmastra"
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography
          variant="h4"
          textAlign={"center"}
          sx={{ fontWeight: 700, lineHeight: 1.5 }}
        >
          Latest Releases
        </Typography>
      </Box>
      <Box
        margin={"auto"}
        display="flex"
        width="80%"
        justifyContent={"center"}
        alignItems="center"
        flexWrap="wrap"
       
      >
        {movies &&
          movies
            .slice(0, 4)
            .map((movie, index) => (
              <MovieItem
                id={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{
            margin: "auto",
            color: "#2b2d42", // Text color
            backgroundColor: "#f0f0f0", // Background color
            fontSize: "18px", // Font size
            padding: "10px 20px", // Adjust padding for text size
            '&:hover': {
              backgroundColor: "#d0d0d0", // Background color on hover
            },
          }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
