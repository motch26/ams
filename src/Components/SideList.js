import React, { useState, useContext } from "react";
import PDFModal from "./PDFModal";
import { Context } from "./../Context";
import criteria from "./../json/criteria.json";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import {
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

function SideList() {
  const [isModalOpen, setModalOpen] = useState(false);
  var { actions, areaNum, parameter, paramData } = useContext(Context);
  const handleModalOpen = (file) => {
    setModalOpen(true);
    actions.setFile(file);
  };
  const handleModalClose = () => setModalOpen(false);
  const closeList = () => actions.setSubShown(false);

  const systems = paramData["SYSTEMS"];
  const implementation = paramData["IMPLEMENTATION"];
  const outcomes = paramData["OUTCOMES"];

  const intAreaNum = parseInt(areaNum.slice(4));
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

  const checkIfCategory = (_category) => {
    const data = criteria["data"];
    if (data[areaNum].hasOwnProperty(parameter))
      if (data[areaNum][parameter].hasOwnProperty(_category))
        return data[areaNum][parameter][_category];
    return [];
  };

  return (
    <Grid item xs={4}>
      <Container>
        <Box>
          <Box
            bgcolor={orange[500]}
            sx={{
              width: 1,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">
              {`Area ${convertToRoman(
                intAreaNum
              )} - Parameter ${parameter.slice(-1)}`}
            </Typography>
            <IconButton onClick={closeList}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box boxShadow={2}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Systems</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {systems.map((file, index) => {
                    const _file = Object.keys(file)[0];
                    const description = file[_file];
                    if (checkIfCategory("SYSTEMS").includes(_file)) {
                      return (
                        <div key={index}>
                          <ListItem>
                            <ListItemText
                              primary={_file}
                              secondary={description}
                            />
                          </ListItem>
                          <Divider />
                        </div>
                      );
                    } else {
                      return (
                        <div key={index}>
                          <ListItemButton
                            onClick={() => handleModalOpen(_file)}
                          >
                            <ListItemText
                              primary={_file}
                              secondary={description}
                            />
                          </ListItemButton>
                          <Divider />
                        </div>
                      );
                    }
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Implementation</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {implementation.map((file, index) => {
                    const _file = Object.keys(file)[0];
                    const description = file[_file];
                    if (checkIfCategory("IMPLEMENTATION").includes(_file)) {
                      return (
                        <div key={index}>
                          <ListItem>
                            <ListItemText
                              primary={_file}
                              secondary={description}
                            />
                          </ListItem>
                          <Divider />
                        </div>
                      );
                    } else {
                      return (
                        <div key={index}>
                          <ListItemButton
                            onClick={() => handleModalOpen(_file)}
                            key={index}
                          >
                            <ListItemText
                              primary={_file}
                              secondary={description}
                            />
                          </ListItemButton>
                          <Divider />
                        </div>
                      );
                    }
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Outcomes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {outcomes.map((file, index) => {
                    const _file = Object.keys(file)[0];
                    const description = file[_file];
                    if (checkIfCategory("OUTCOMES").includes(_file)) {
                      return (
                        <div key={index}>
                          <ListItem>
                            <ListItemText
                              primary={_file}
                              secondary={description}
                            />
                          </ListItem>
                          <Divider />
                        </div>
                      );
                    } else {
                      return (
                        <div key={index}>
                          <ListItemButton
                            onClick={() => handleModalOpen(_file)}
                            key={index}
                          >
                            <ListItemText
                              primary={_file}
                              secondary={description}
                            />
                          </ListItemButton>
                          <Divider />
                        </div>
                      );
                    }
                  })}
                </List>
              </AccordionDetails>
            </Accordion>
          </Box>
          <PDFModal
            isModalOpen={isModalOpen}
            handleModalClose={handleModalClose}
          />
        </Box>
      </Container>
    </Grid>
  );
}

export default SideList;
