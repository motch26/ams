import React, { useState, useRef } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import { blue } from "@mui/material/colors";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import {
  Modal,
  ButtonGroup,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import printJS from "print-js";
function DropboxModal({ isModalOpen, handleModalClose, file }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const pageNavigate = (offset) => setPageNumber((prev) => (prev += offset));
  const pdfLoaded = ({ numPages }) => setNumPages(numPages);
  const handleScale = (delta) => setScale((prev) => (prev = prev + delta));

  const printPDF = () => printJS("pdf/sample.pdf");
  return (
    <Modal open={isModalOpen} onClose={handleModalClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 1,
        }}
      >
        <Box
          sx={{
            p: 1,
            bgcolor: blue[300],
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{file}</Typography>
          <Button variant="outlined" onClick={printPDF}>
            Print{" "}
          </Button>
        </Box>
        <Box sx={{ maxHeight: "80vh", minWidth: "500px", overflowY: "auto" }}>
          <Document file="pdf/sample.pdf" onLoadSuccess={pdfLoaded}>
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
            <IconButton onClick={() => handleScale(-0.5)}>
              <ZoomOutIcon />
            </IconButton>
            {scale}
            <IconButton onClick={() => handleScale(0.5)}>
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
    </Modal>
  );
}

export default DropboxModal;
