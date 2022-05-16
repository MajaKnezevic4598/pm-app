import { useEffect } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "./GaleryTest.scss";
import { FiDownload } from "react-icons/fi";

const GaleryTest = (props) => {
  useEffect(() => {
    console.log(props);
  }, [props]);

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
    <Gallery>
      {props.imagesToShow.map((images) => {
        return (
          <Item
            original={`https://pm-app-bek.herokuapp.com${images.attributes.url}`}
            thumbnail={`https://pm-app-bek.herokuapp.com${images.attributes.formats.thumbnail.url}`}
            width="1024"
            height="768"
          >
            {({ ref, open }) => (
              <div className="galery-conteiner">
                <img
                  ref={ref}
                  onClick={open}
                  src={`https://pm-app-bek.herokuapp.com${images.attributes.formats.thumbnail.url}`}
                  className="galery-conteiner__img"
                />
                <div
                  className="download-icon"
                  onClick={() =>
                    downloadResource(
                      "https://pm-app-bek.herokuapp.com" + images.attributes.url
                    )
                  }
                >
                  {" "}
                  <FiDownload />
                </div>
              </div>
            )}
          </Item>
        );
      })}
    </Gallery>
  );
};

export default GaleryTest;
