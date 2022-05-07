import uuid from "react-uuid";
import PDFFile from "./PDFFile";
import { useState } from "react";
import { useNavigate } from "react-router";

const NoteDocsTable = ({ fileName, filePath, fileExtension, id }) => {
  const [changeView, setChangeView] = useState(false);

  const navigate = useNavigate();

  const showPDF = () => {
    console.log("kliknuto");
    console.log(fileExtension);
    if (fileExtension === ".pdf") {
      //   console.log("ja sam pdf");
      //   console.log(fileName);
      //   setChangeView(true);
      navigate(`/${id}/notes/notes-docs${filePath}`);
    }
  };
  return (
    <div className="table-conteiner" key={uuid()}>
      {/* {!changeView ? (
        <>
          <div onClick={showPDF}>{fileName}</div>
          <div>{fileExtension}</div>
        </>
      ) : (
        <PDFFile filePath={filePath} />
      )} */}

      {/* {!changeView && (
        <>
          <div onClick={showPDF}>{fileName}</div>
          <div>{fileExtension}</div>
        </>
      )}
      {changeView && <PDFFile filePath={filePath} />}
    </div> */}
      <div onClick={showPDF}>{fileName}</div>
      <div>{fileExtension}</div>
    </div>
  );
};

export default NoteDocsTable;
