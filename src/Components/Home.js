import { useContext } from "react";
import MyAppBar from "./MyAppBar";
import { Context } from "./../Context";
import Start from "./Start";
import AreasFolder from "./AreasFolder";
import { Box } from "@mui/material";

function Home() {
  const { program } = useContext(Context);

  return (
    <Box>
      <MyAppBar />
      {program ? <AreasFolder /> : <Start />}
    </Box>
  );
}

export default Home;
