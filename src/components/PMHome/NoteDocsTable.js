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

  function forceDownload(blob, filename) {
    var a = document.createElement("a");
    a.download = filename;
    a.href = blob;
    document.body.appendChild(a);
    a.click();
    a.remove();
    //<a href={blob} download></a>
  }

  function downloadResource(url, filename) {
    if (!filename) filename = url.split("\\").pop().split("/").pop();
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        let blobUrl = window.URL.createObjectURL(blob);
        forceDownload(blobUrl, filename);
      })
      .catch((e) => console.error(e));
  }

  return (
    <div className="single-docs-conteiner" key={uuid()}>
      <div onClick={showFile}>
        <div>{fileName}</div>
      </div>
      <div
        onClick={() =>
          downloadResource("https://pm-app-bek.herokuapp.com" + filePath)
        }
        className="download"
      >
        {/* {images ? "nisu slike" : "Download"} */}
        download
      </div>

      {/* {images ? (
        <div className="img-conteiner" style={{ border: "1px solid blue" }}>
          {images.map((i) => {
            return (
              <div className="img-item" style={{ border: "1px solid red" }}>
                {!open && (
                  <div
                    onClick={() => {
                      openGalery();
                    }}
                  >
                    {i.attributes.name}
                  </div>
                )}
                <div
                  onClick={() =>
                    downloadResource(
                      "https://pm-app-bek.herokuapp.com" + i.attributes.url
                    )
                  }
                >
                  Download
                </div>
              </div>
            );
          })}
          {open && <GaleryTest imagesToShow={images} />}
        </div>
      ) : null} */}
    </div>
  );
};

export default NoteDocsTable;
