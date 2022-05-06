import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Divider,
} from "@mui/material";

import SideList from "./SideList";
import { areaFolder } from "../Theme/Home";
import Parameters from "./Parameters";
import { Context } from "./../Context";

function AreasFolder() {
  const { programData, isSubShown, setSubShown } = useContext(Context);

  return (
    <Box sx={{ width: "90vw", mx: "auto" }}>
      <Grid container>
        <Grid container item xs={isSubShown ? 8 : 12} rowSpacing={3}>
          {programData.map((area, index) => {
            const areaNumber = Object.keys(area)[0];
            const areaContent = area[areaNumber];
            const intAreaNum = parseInt(areaNumber.slice(4));
            function convertToRoman(num) {
              var roman = {
                M: 1000,
                CM: 900,
                D: 500,
                CD: 400,
                C: 100,
                XC: 90,
                L: 50,
                XL: 40,
                X: 10,
                IX: 9,
                V: 5,
                IV: 4,
                I: 1,
              };
              var str = "";

              for (var i of Object.keys(roman)) {
                var q = Math.floor(num / roman[i]);
                num -= q * roman[i];
                str += i.repeat(q);
              }

              return str;
            }
            return (
              <Grid item md={4} xs={6} onClick={setSubShown} key={index}>
                <Card sx={areaFolder}>
                  <CardMedia
                    component="img"
                    height="120"
                    image="img/folder.jpg"
                    alt="folder"
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {`Area ${convertToRoman(intAreaNum)}`}
                    </Typography>
                    <Divider />
                    <Typography variant="body2" mt={1}>
                      Parameters:
                    </Typography>
                    <Parameters
                      areaNumber={areaNumber}
                      areaContent={areaContent}
                    />
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        {isSubShown ? <SideList /> : null}
      </Grid>
    </Box>
  );
}

export default AreasFolder;
