import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import axios from "axios";
import { Context } from "./../Context";
import {
  Box,
  List,
  ListSubheader,
  ListItemButton,
  Button,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { orange } from "@mui/material/colors";

function UploadedPDF({ handleModalOpen }) {
  const { actions, program, areaNum, parameter, file } = useContext(Context);
  const [dates, setDates] = useState([]);
  const [rows, setRows] = useState([]);
  const refresh = () => {
    axios.get(`http://ams.chmsc.edu.ph/api/listUpload.php`).then((res) => {
      setDates(res.data[0]);
      setRows(res.data[1]);
    });
  };
  useEffect(() => refresh(), []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Button
        variant="outlined"
        size="small"
        startIcon={<RefreshIcon />}
        sx={{ alignSelf: "end", borderColor: orange[100], color: orange[500] }}
        onClick={refresh}
      >
        Refresh
      </Button>
      {dates.length ? (
        dates.map((date, index) => {
          return (
            <List dense={true} key={`list${index}`}>
              <ListSubheader sx={{ textAlign: "right" }}>
                {moment(date, "YYYY-MM-DD").format("MMM DD, YYYY")}
              </ListSubheader>
              {rows.map((row, index) => {
                if (row.dateUpload === date) {
                  return (
                    <ListItemButton
                      onClick={() => {
                        handleModalOpen();
                        actions.setFile(row.fileName);
                      }}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      key={index}
                    >
                      {row.fileName}
                      <Stack direction="row" spacing={2}>
                        <Chip
                          label={row.program}
                          color="warning"
                          size="small"
                        />
                        <Chip
                          label={`Area ${row.areaNum.slice(-1)}`}
                          color="warning"
                          size="small"
                        />
                        <Chip
                          label={`Parameter ${row.parameter.slice(-1)}`}
                          color="warning"
                          size="small"
                        />
                      </Stack>
                    </ListItemButton>
                  );
                }
              })}
            </List>
          );
        })
      ) : (
        <Typography sx={{ textAlign: "center", p: 1 }} variant="h5">
          No Files Uploaded
        </Typography>
      )}
    </Box>
  );
}

export default UploadedPDF;
