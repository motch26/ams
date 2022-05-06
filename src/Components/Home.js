import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import MyAppBar from "./MyAppBar";
import { Context } from "./../Context";
import Start from "./Start";
import AreasFolder from "./AreasFolder";
import { Container, Box, Grid, Paper, Typography } from "@mui/material";

function Home() {
  const { program, programData } = useContext(Context);
  const { userID } = useParams();

  const folders = [
    {
      area: "Area 1",
      description: "Vision, Mission, Goals and Objectives",
    },
    {
      area: "Area 2",
      description: "Faculty",
    },
    {
      area: "Area 3",
      description: "Curriculum and Instruction",
    },
    {
      area: "Area 4",
      description: "Support to Students",
    },
    {
      area: "Area 5",
      description: "Research",
    },
    {
      area: "Area 6",
      description: "Extension and Community Involvement",
    },
    {
      area: "Area 7",
      description: "Library",
    },
    {
      area: "Area 8",
      description: "Physical Plant and Facilities",
    },
    {
      area: "Area 9",
      description: "Laboratories",
    },
    {
      area: "Area 10",
      description: "Administration",
    },
  ];

  return (
    <Box>
      <MyAppBar />
      {program ? <AreasFolder /> : <Start />}
    </Box>
  );
}

export default Home;
