import { useEffect } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";

const GaleryTest = (props) => {
  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <Gallery withDownloadButton>
      {props.imagesToShow.map((images) => {
        return (
          <Item
            original={`https://pm-app-bek.herokuapp.com${images.attributes.url}`}
            thumbnail={`https://pm-app-bek.herokuapp.com${images.attributes.formats.thumbnail.url}`}
            width="1024"
            height="768"
          >
            {({ ref, open }) => (
              <img
                ref={ref}
                onClick={open}
                src={`https://pm-app-bek.herokuapp.com${images.attributes.formats.thumbnail.url}`}
              />
            )}
          </Item>
        );
      })}
    </Gallery>
  );
};

export default GaleryTest;
