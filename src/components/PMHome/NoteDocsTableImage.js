import { useState } from "react";
import GaleryTest from "./GaleryTest";
import "./NoteDocsTableImage.scss";

const NoteDocsTableImage = ({ images }) => {
  const [open, setOpen] = useState(false);

  const openGalery = () => {
    console.log("kliknula sam na galeriju");
    setOpen(true);
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
    <div>
      {" "}
      {images ? (
        <div style={{ border: "1px solid blue" }}>
          {images.map((i) => {
            return (
              <div
                style={{
                  border: "1px solid red",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1vh",
                }}
              >
                {!open && (
                  <div
                    onClick={() => {
                      openGalery();
                    }}
                  >
                    {i.attributes.name}
                  </div>
                )}
                {!open && (
                  <div
                    className="download"
                    onClick={() =>
                      downloadResource(
                        "https://pm-app-bek.herokuapp.com" + i.attributes.url
                      )
                    }
                  >
                    download
                  </div>
                )}
              </div>
            );
          })}
          {open && <GaleryTest imagesToShow={images} />}
        </div>
      ) : null}
    </div>
  );
};

export default NoteDocsTableImage;

//  {
//    images ? (
//      <div className="img-conteiner" style={{ border: "1px solid blue" }}>
//        {images.map((i) => {
//          return (
//            <div className="img-item" style={{ border: "1px solid red" }}>
//              {!open && (
//                <div
//                  onClick={() => {
//                    openGalery();
//                  }}
//                >
//                  {i.attributes.name}
//                </div>
//              )}
//              <div
//                onClick={() =>
//                  downloadResource(
//                    "https://pm-app-bek.herokuapp.com" + i.attributes.url
//                  )
//                }
//              >
//                Download
//              </div>
//              {/* <div
//                   onClick={() => {
//                     openGalery();
//                   }}
//                 >
//                   {i.attributes.name}
//                 </div> */}
//            </div>
//          );
//        })}
//        {open && <GaleryTest imagesToShow={images} />}
//      </div>
//    ) : null;
//  }
