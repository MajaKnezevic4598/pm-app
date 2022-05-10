import "photoswipe/dist/photoswipe.css";
import { useParams } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";

// import { Gallery, Item } from "react-photoswipe-gallery";
import { PhotoSwipe } from "react-photoswipe";
// import PhotoSwipeLightbox from "photoswipe/lightbox";
const Galery = () => {
  //   const lightbox = new PhotoSwipeLightbox({
  //     gallery: "#gallery--test-bgopacity",
  //     children: "a",
  //     pswpModule: () => import("photoswipe"),
  //     bgOpacity: 0.2,
  //   });
  //   lightbox.init();

  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const { id, filePath, thumbnail } = useParams();
  console.log(filePath);

  let items = [
    {
      src: `https://pm-app-bek.herokuapp.com/uploads/${filePath}`,
      w: 1200,
      h: 900,
      title: `${filePath}`,
    },
  ];

  let options = {
    bgOpacity: 0.9,
  };

  const handleClose = () => {
    setIsOpen(false);

    navigate(-1);
  };
  return (
    // <Gallery>
    //   <Item
    //     original={`https://pm-app-bek.herokuapp.com/uploads/${filePath}`}
    //     thumbnail={`https://pm-app-bek.herokuapp.com/uploads/${thumbnail}`}
    //     width="1024"
    //     height="768"
    //   >
    //     {({ ref, open }) => (
    //       <img
    //         ref={ref}
    //         onClick={open}
    //         src={`https://pm-app-bek.herokuapp.com/uploads/${thumbnail}`}
    //       />
    //     )}
    //   </Item>
    // </Gallery>
    <PhotoSwipe
      isOpen={isOpen}
      items={items}
      options={options}
      onClose={handleClose}
    />
  );
};

export default Galery;
