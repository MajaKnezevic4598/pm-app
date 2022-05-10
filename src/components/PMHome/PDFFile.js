import { Worker } from "@react-pdf-viewer/core";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useParams } from "react-router";

const PDFFile = () => {
  const { id, filePath } = useParams();
  console.log(id);
  console.log(filePath);
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
      <Viewer
        fileUrl={`https://pm-app-bek.herokuapp.com/uploads/${filePath}`}
      />
      ...
    </Worker>
  );
};

export default PDFFile;
