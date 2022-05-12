import { useQuery } from "react-query";
import { useParams } from "react-router";
import axiosInstance from "../../helpers/axiosInstance";
import { useEffect, useState } from "react";
import "./NoteDocs.scss";
import NoteDocsTable from "./NoteDocsTable";
import GaleryTest from "./GaleryTest";

const fetchNoteDocs = async (id) => {
  try {
    const response = await axiosInstance.get(`notes/${id}?populate=files`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error.message);
  }
};

const NoteDocs = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery(["note-docs", id], () => {
    return fetchNoteDocs(id);
  });

  const [imageArr, setImageArr] = useState([]);
  const [notImageArr, setNotImageArr] = useState([]);

  useEffect(() => {
    if (data) {
      const isImage = data.attributes.files.data.filter((d) => {
        return (
          d.attributes.ext === ".jpg" ||
          d.attributes.ext === ".png" ||
          d.attributes.ext === ".jpeg" ||
          d.attributes.ext === ".JPEG" ||
          d.attributes.ext === ".JPG"
        );
      });

      setImageArr([...isImage]);

      const isNotImage = data.attributes.files.data.filter((d) => {
        return (
          d.attributes.ext !== ".jpg" &&
          d.attributes.ext !== ".png" &&
          d.attributes.ext !== ".jpeg" &&
          d.attributes.ext !== ".JPEG" &&
          d.attributes.ext !== ".JPG"
        );
      });

      setNotImageArr([...isNotImage]);
    }
  }, [data]);

  useEffect(() => {
    console.log(imageArr);
    console.log("ja sam image arr");
  }, [imageArr]);

  useEffect(() => {
    console.log(notImageArr);
    console.log("ja sam niz bez slika");
  }, [notImageArr]);

  return (
    <div className="docs-conteiner">
      <div className="docs-conteiner__header">
        <h4>Document name:</h4>
        <h4>Document type</h4>
      </div>
      {/* {data?.attributes &&
        data?.attributes?.files?.data?.map((d) => {
          return (
            <NoteDocsTable
              // fileName={d.attributes.name}
              // filePath={d.attributes.url}
              // fileExtension={d.attributes.ext}
              // id={id}
              // //   thumbnail={d.attributes.formats.thumbnail.url}
              // //d.attributes.formats.thumbnail.url
              // thumbnail={
              //   d.attributes.formats?.thumbnail.url
              //     ? d.attributes.formats?.thumbnail.url
              //     : ""
              // }
              docsData={d}
            />
          );
        })} */}
      {/* treba napraviti niz za fajlove koji nisu slika i za fajlove koji su slika */}
      {data?.attributes &&
        notImageArr.map((noImage) => {
          return (
            <NoteDocsTable
              fileName={noImage.attributes.name}
              filePath={noImage.attributes.url}
              fileExtension={noImage.attributes.ext}
              id={id}
            />
          );
        })}
      {imageArr.length !== 0 && <NoteDocsTable images={imageArr} />}
    </div>
  );
};

export default NoteDocs;
