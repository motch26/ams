import React, { useContext, useState } from "react";
import { Context } from "./../Context";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import {
  Grid,
  Container,
  Box,
  Typography,
  IconButton,
  Button,
  ButtonGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { orange } from "@mui/material/colors";

function ProgramPerformance() {
  const { actions } = useContext(Context);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const pageNavigate = (offset) => setPageNumber((prev) => (prev += offset));
  const pdfLoaded = ({ numPages }) => setNumPages(numPages);
  const handleScale = (delta) => setScale((prev) => (prev = prev + delta));
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
            <Typography variant="h6">Program Performance Profile</Typography>
            <IconButton onClick={() => actions.setPerformanceShown(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box boxShadow={2}>
            <Box sx={{ maxHeight: "80vh", width: "auto", overflowY: "auto" }}>
              <Document
                file="pdf/sample.pdf"
                onLoadSuccess={pdfLoaded}
                noData={"No file attached in this section."}
              >
                <Page pageNumber={pageNumber} scale={scale} />
              </Document>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">
                Page {pageNumber} of {numPages}
              </Typography>
              <Box>
                <IconButton
                  disabled={scale === 1.0 ? true : false}
                  onClick={() => handleScale(-0.5)}
                >
                  <ZoomOutIcon />
                </IconButton>
                {scale}
                <IconButton
                  disabled={scale === 2.0 ? true : false}
                  onClick={() => handleScale(0.5)}
                >
                  <ZoomInIcon />
                </IconButton>
              </Box>
              <ButtonGroup variant="contained">
                {pageNumber > 1 ? (
                  <Button
                    startIcon={<ArrowLeftIcon />}
                    onClick={() => pageNavigate(-1)}
                  >
                    Prev
                  </Button>
                ) : null}
                {pageNumber < numPages ? (
                  <Button
                    endIcon={<ArrowRightIcon />}
                    onClick={() => pageNavigate(1)}
                  >
                    Next
                  </Button>
                ) : null}
              </ButtonGroup>
            </Box>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
}

export default ProgramPerformance;
