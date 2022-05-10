import uuid from "react-uuid";
import "./NoteDocsTable.scss";

import { useNavigate } from "react-router";

const NoteDocsTable = ({
  fileName,
  filePath,
  fileExtension,
  id,
  thumbnail,
}) => {
  const navigate = useNavigate();

  console.log(thumbnail);

  const showFile = () => {
    if (fileExtension === ".pdf") {
      navigate(`/${id}/notes/notes-docs${filePath}`);
    }
    if (
      fileExtension === ".jpeg" ||
      fileExtension === ".jpg" ||
      fileExtension === ".png"
    ) {
      console.log("ja sam pngaa");
      navigate(`/${id}/notes/notes-docs${filePath}/galery${thumbnail}`);
    }
  };
  return (
    <div className="single-docs-conteiner" key={uuid()}>
      <div onClick={showFile}>{fileName}</div>
      <div>{fileExtension}</div>
    </div>
  );
};

export default NoteDocsTable;
