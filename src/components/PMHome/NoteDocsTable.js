import uuid from "react-uuid";
import "./NoteDocsTable.scss";
import GaleryTest from "./GaleryTest";

import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const NoteDocsTable = ({
  fileName,
  filePath,
  fileExtension,
  id,
  thumbnail,
  images,
}) => {
  const navigate = useNavigate();

  // console.log(thumbnail);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(images);
  }, [images]);

  const openGalery = () => {
    console.log("kliknula sam na galeriju");
    setOpen(true);
  };
  const showFile = () => {
    if (fileExtension === ".pdf") {
      navigate(`/${id}/notes/notes-docs${filePath}`);
    }
    if (
      fileExtension === ".jpeg" ||
      fileExtension === ".jpg" ||
      fileExtension === ".png" ||
      fileExtension === ".JPEG" ||
      fileExtension === ".JPG"
    ) {
      console.log("ja sam pngaa");

      console.log("niz slika");
      // navigate(`/${id}/notes/notes-docs${filePath}/galery${thumbnail}`);
    }
  };
  return (
    <div className="single-docs-conteiner" key={uuid()}>
      <div onClick={showFile}>{fileName}</div>
      <div>{fileExtension}</div>

      {images ? (
        <div>
          {images.map((i) => {
            return (
              <>
                {!open && (
                  <div
                    onClick={() => {
                      openGalery();
                    }}
                  >
                    {i.attributes.name}
                  </div>
                )}
                {/* <div
                  onClick={() => {
                    openGalery();
                  }}
                >
                  {i.attributes.name}
                </div> */}
              </>
            );
          })}
          {open && <GaleryTest imagesToShow={images} />}
        </div>
      ) : null}
    </div>
  );
};

export default NoteDocsTable;
